
import { GoogleGenAI } from "@google/genai";
import { UserPreference, GenerationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStyleVisualization = async (
  imageData: string, 
  prefs: UserPreference
): Promise<GenerationResult[]> => {
  const base64Data = imageData.split(',')[1];
  const { vibe, species, gender, breed, furType } = prefs;
  
  // Diverse style templates
  const getStyles = (v: string, s: string, g: string) => {
    if (s === 'Pet') {
      const petBreedInfo = breed ? `for a ${breed}` : '';
      const furInfo = furType ? `with ${furType} fur` : '';
      return [
        `a creative ${v} style ${petBreedInfo} ${furInfo} with artistic highlights and precision trimming`,
        `a modern ${v} grooming look ${petBreedInfo} featuring a stylish shape and clean lines`,
        `a unique ${v} thematic cut ${petBreedInfo} that emphasizes the facial features and personality`
      ];
    }

    const genderContext = g === 'Male' ? 'masculine' : g === 'Female' ? 'feminine' : 'unisex';
    const stylesMap: Record<string, string[]> = {
      bold: [
        `an edgy ${genderContext} textured wolf cut with sharp architectural layers`,
        `a bold ${genderContext} vivid-colored undercut with geometric shaved designs`,
        `a high-fashion ${genderContext} avant-garde style with extreme volume and metallic tints`
      ],
      classic: [
        `a sophisticated ${genderContext} sleek chin-length cut with perfect symmetry`,
        `a timeless ${genderContext} elegant tapered look with a clean professional finish`,
        `a glamorous ${genderContext} vintage-inspired waves or tailored grooming`
      ],
      natural: [
        `a soft ${genderContext} effortlessly messy look with organic texture`,
        `a gentle ${genderContext} sun-kissed layered style that flows naturally`,
        `a minimalist ${genderContext} clean and healthy grooming look with subtle depth`
      ],
      fun: [
        `a playful ${genderContext} pattern-dyed style with celebratory accents`,
        `a quirky ${genderContext} asymmetric cut with imaginative color pops`,
        `a whimsical ${genderContext} high-energy style with creative accessories integrated`
      ],
      wild: [
        `a fierce ${genderContext} untamed voluminous mane with jungle-inspired textures`,
        `a radical ${genderContext} bio-punk inspired look with glowing accents and spikes`,
        `a chaotic ${genderContext} yet beautiful multi-dimensional layered explosion of style`
      ]
    };

    return stylesMap[v] || stylesMap['classic'];
  };

  const selectedStyles = getStyles(vibe, species, gender).slice(0, 3);
  
  const results: GenerationResult[] = [];

  // Generate 3 variations
  for (const styleDesc of selectedStyles) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image-preview",
        contents: {
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: base64Data } },
            { text: `Grooming visualization: Take the ${species.toLowerCase()} ${gender !== 'Neutral' ? `(${gender.toLowerCase()})` : ''} in this image and visualize them with ${styleDesc}. 
Keep the subject's face, identity, expression, and background completely identical to the source. 
Seamlessly add the new grooming style. It must look photorealistic, professional salon quality, 4k resolution.` }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        }
      });

      let generatedBase64 = '';
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedBase64 = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (generatedBase64) {
        results.push({
          imageUrl: generatedBase64,
          styleName: vibe.charAt(0).toUpperCase() + vibe.slice(1) + " Style",
          description: `A ${styleDesc} designed to complement your ${vibe} personality.`
        });
      }
    } catch (err) {
      console.error("Variation generation failed:", err);
    }
  }

  if (results.length === 0) {
    throw new Error("No visualizations could be generated. Please try again.");
  }

  return results;
};
