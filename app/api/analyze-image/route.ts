import {NextResponse} from 'next/server';
import {GoogleGenerativeAI} from '@google/generative-ai'
import { AnyNode } from 'postcss';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export async function POST(request: Request) {
  try {
    console.log("Starting image analysis request...");

    const { image } = await request.json();

    // Initial validation
    if (!image) {
      console.log("No image data received");
      return NextResponse.json(
        { error: "No image data provided" },
        { status: 400 }
      );
    }

    // API Key validation
    if (!process.env.GEMINI_API_KEY) {
      console.log("Missing Gemini API key");
      return NextResponse.json(
        { error: "Server configuration error - Missing API key" },
        { status: 500 }
      );
    }

    try {
      // Base64 validation and processing
      if (!image.includes("base64,")) {
        return NextResponse.json(
          { error: "Invalid image format - Missing base64 encoding" },
          { status: 400 }
        );
      }

      const base64Parts = image.split(",");
      const base64Image = base64Parts[1];
      const mimeType = base64Parts[0].split(":")[1].split(";")[0];

      console.log("Image MIME type:", mimeType);
      console.log("Processing image of size:", base64Image.length);

      try {
        console.log("Initializing Gemini model...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        console.log("Making Gemini API request...");
        const result = await model.generateContent([
          `Analyze this emergency situation image and respond in this exact format:
                    TITLE: Write a clear, brief title
                    TYPE: Choose one (Theft, Fire Outbreak, Medical Emergency, Natural Disaster, Violence, or Other)
                    DESCRIPTION: Write a clear, concise description`,
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
        ]);

        if (!result || !result.response) {
          throw new Error("No response from Gemini API");
        }

        console.log("Processing Gemini response...");
        const text = await result.response.text();

        const titleMatch = text.match(/TITLE:\s*(.+)/);
        const typeMatch = text.match(/TYPE:\s*(.+)/);
        const descMatch = text.match(/DESCRIPTION:\s*(.+)/);

        if (!titleMatch || !typeMatch || !descMatch) {
          throw new Error("Invalid response format from Gemini API");
        }

        return NextResponse.json({
          title: titleMatch[1].trim(),
          reportType: typeMatch[1].trim(),
          description: descMatch[1].trim(),
        });
      } catch (geminiError : any) {
        console.error("Gemini API error:", {
          message: geminiError.message,
          name: geminiError.name,
          stack: geminiError.stack,
        });
        return NextResponse.json(
          { error: `Failed to analyze image with AI: ${geminiError.message}` },
          { status: 500 }
        );
      }
    } catch (processingError : any) {
      console.error("Image processing error:", {
        message: processingError.message,
        name: processingError.name,
        stack: processingError.stack,
      });
      return NextResponse.json(
        { error: `Failed to process image: ${processingError.message}` },
        { status: 500 }
      );
    }
  } catch (error : any) {
    console.error("Request error:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
