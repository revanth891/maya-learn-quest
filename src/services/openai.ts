interface OpenAIConfig {
  apiKey: string;
  model?: string;
}

interface LessonContent {
  title: string;
  description: string;
  exercises: Exercise[];
  points: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation' | 'listening';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

class OpenAIService {
  private apiKey: string;
  private model: string;
  private baseUrl = 'https://api.intelligence.io.solutions/api/v1/';

  constructor(config: OpenAIConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'meta-llama/Llama-3.3-70B-Instruct';
  }

  async generateLesson(
    topic: string, 
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    nativeLanguage: string = 'en'
  ): Promise<LessonContent> {
    const prompt = this.createLessonPrompt(topic, difficulty, nativeLanguage);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are Maya, an expert English tutor who creates engaging, gamified lessons for language learners. Always respond with valid JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating lesson:', error);
      // Return fallback lesson
      return this.getFallbackLesson(topic, difficulty);
    }
  }

  async generateFeedback(
    userAnswer: string,
    correctAnswer: string,
    context: string
  ): Promise<string> {
    const prompt = `
      As Maya, provide encouraging feedback for this English learning attempt:
      
      Context: ${context}
      User's answer: "${userAnswer}"
      Correct answer: "${correctAnswer}"
      
      Give a helpful, encouraging response that explains any mistakes and provides tips for improvement. Keep it friendly and motivating, under 100 words.
    `;

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are Maya, a supportive English tutor. Be encouraging and helpful.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating feedback:', error);
      return this.getFallbackFeedback(userAnswer === correctAnswer);
    }
  }

  private createLessonPrompt(topic: string, difficulty: string, nativeLanguage: string): string {
    return `
      Create a ${difficulty} English lesson about "${topic}" for someone whose native language is ${nativeLanguage}.
      
      Return a JSON object with this exact structure:
      {
        "title": "Lesson title",
        "description": "Brief lesson description",
        "points": ${difficulty === 'beginner' ? 10 : difficulty === 'intermediate' ? 15 : 20},
        "difficulty": "${difficulty}",
        "exercises": [
          {
            "id": "unique_id",
            "type": "multiple-choice",
            "question": "Question text",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "correctAnswer": "Correct option",
            "explanation": "Why this is correct",
            "points": 5
          }
        ]
      }
      
      Create 4-6 varied exercises using different types: multiple-choice, fill-blank, translation.
      Make questions engaging and practical for real-world English use.
      Include cultural context and British English specifically.
    `;
  }

  private getFallbackLesson(topic: string, difficulty: string): LessonContent {
    return {
      title: `${topic} - ${difficulty} Level`,
      description: `Learn about ${topic} in English`,
      points: difficulty === 'beginner' ? 10 : difficulty === 'intermediate' ? 15 : 20,
      difficulty: difficulty as any,
      exercises: [
        {
          id: 'fallback_1',
          type: 'multiple-choice',
          question: `Which word is related to ${topic}?`,
          options: ['Hello', 'Goodbye', 'Please', 'Thank you'],
          correctAnswer: 'Hello',
          explanation: 'This is a common English greeting.',
          points: 5
        }
      ]
    };
  }

  private getFallbackFeedback(isCorrect: boolean): string {
    return isCorrect
      ? "Great job! You're making excellent progress in your English learning journey!"
      : "Don't worry, mistakes help us learn! Keep practicing and you'll improve quickly.";
  }
  
  async generateBlogContent(
    topic: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
  ): Promise<string> {
    const prompt = `Generate an engaging blog post about ${topic}. Write it in HTML format with proper structure including headings, paragraphs, and appropriate styling classes that match our UI. The content should be informative, well-structured, and approximately 800-1000 words. Include an image placeholder with the src="/placeholder.svg" and appropriate alt text.`;
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a content generator that creates blog posts in HTML format. Return ONLY the HTML content without any additional text or explanation.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating blog content:', error);
      return this.getFallbackBlogContent(topic);
    }
  }

  private getFallbackBlogContent(topic: string): string {
    return `
      <h1 class="text-3xl font-bold mb-6">${topic} Overview</h1>
      <p class="mb-4">Content for ${topic} is currently being loaded. Please refresh the page.</p>
      <p class="mb-4">The United Kingdom has a rich and diverse ${topic.toLowerCase()} that has evolved over centuries.</p>
    `;
  }
}

// Singleton instance
let openAIService: OpenAIService | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openAIService = new OpenAIService({ apiKey });
  return openAIService;
};

export const getOpenAIService = (): OpenAIService | null => {
  return openAIService;
};

export const isOpenAIConfigured = (): boolean => {
  return openAIService !== null;
};

export type { LessonContent, Exercise, OpenAIConfig };