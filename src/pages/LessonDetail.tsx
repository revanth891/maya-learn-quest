import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import Maya3D from '@/components/Maya3D';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { getOpenAIService, isOpenAIConfigured, type Exercise, type LessonContent } from '@/services/openai';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, ArrowRight, Star } from 'lucide-react';

const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addPoints, unlockAchievement } = useGame();
  const { toast } = useToast();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [exerciseAnswer, setExerciseAnswer] = useState('');

  // Mock lesson data for when OpenAI is not configured
  const mockLessons: Record<string, LessonContent> = {
    greetings: {
      title: 'Greetings & Introductions',
      description: 'Learn how to say hello and introduce yourself in English',
      difficulty: 'beginner',
      points: 10,
      exercises: [
        {
          id: '1',
          type: 'multiple-choice',
          question: 'How do you greet someone in the morning?',
          options: ['Good morning', 'Good night', 'Good evening', 'Good afternoon'],
          correctAnswer: 'Good morning',
          explanation: 'Good morning is used to greet someone before noon.',
          points: 2
        },
        {
          id: '2',
          type: 'fill-blank',
          question: 'Complete: "Hello, my name __ John."',
          correctAnswer: 'is',
          explanation: 'We use "is" with singular subjects like names.',
          points: 2
        },
        {
          id: '3',
          type: 'multiple-choice',
          question: 'Which is a polite way to ask someone\'s name?',
          options: ['What\'s your name?', 'Tell me your name!', 'Your name now!', 'Name?'],
          correctAnswer: 'What\'s your name?',
          explanation: 'This is the most polite and common way to ask for someone\'s name.',
          points: 3
        }
      ]
    },
    numbers: {
      title: 'Numbers & Counting',
      description: 'Master numbers from 1 to 100 and basic counting',
      difficulty: 'beginner',
      points: 10,
      exercises: [
        {
          id: '1',
          type: 'multiple-choice',
          question: 'What comes after "nineteen"?',
          options: ['twenty', 'thirty', 'eighteen', 'ninety'],
          correctAnswer: 'twenty',
          explanation: 'After nineteen comes twenty.',
          points: 2
        }
      ]
    }
  };

  useEffect(() => {
    loadLesson();
  }, [id]);

  const loadLesson = async () => {
    if (!id) return;
    
    setIsLoading(true);
    
    try {
      const openAIService = getOpenAIService();
      
      if (isOpenAIConfigured() && openAIService) {
        // Generate lesson with AI
        const lessonTopic = id.replace('-', ' ');
        const generatedLesson = await openAIService.generateLesson(
          lessonTopic,
          'beginner' // You could determine this based on the lesson ID
        );
        setLesson(generatedLesson);
      } else {
        // Use mock lesson
        const mockLesson = mockLessons[id];
        if (mockLesson) {
          setLesson(mockLesson);
        } else {
          // Default fallback lesson
          setLesson({
            title: 'English Lesson',
            description: 'Learn English with interactive exercises',
            difficulty: 'beginner',
            points: 10,
            exercises: [
              {
                id: '1',
                type: 'multiple-choice',
                question: 'Which greeting is most common?',
                options: ['Hello', 'Goodbye', 'Maybe', 'Never'],
                correctAnswer: 'Hello',
                explanation: 'Hello is the most common greeting in English.',
                points: 5
              }
            ]
          });
        }
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
      toast({
        title: "Error",
        description: "Failed to load lesson. Using offline content.",
        variant: "destructive"
      });
      
      // Use fallback
      setLesson(mockLessons[id || 'greetings'] || mockLessons.greetings);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (answer: string) => {
    if (!lesson) return;
    
    const exercise = lesson.exercises[currentExercise];
    const correct = answer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
    
    setIsCorrect(correct);
    setShowResult(true);
    
    // Update answers array
    const newAnswers = [...userAnswers];
    newAnswers[currentExercise] = answer;
    setUserAnswers(newAnswers);

    // Get AI feedback if available
    try {
      const openAIService = getOpenAIService();
      if (isOpenAIConfigured() && openAIService) {
        const aiFeedback = await openAIService.generateFeedback(
          answer,
          exercise.correctAnswer,
          exercise.question
        );
        setFeedback(aiFeedback);
      } else {
        setFeedback(correct ? 
          "Great job! You got it right!" : 
          `Not quite. The correct answer is "${exercise.correctAnswer}". ${exercise.explanation}`
        );
      }
    } catch (error) {
      setFeedback(exercise.explanation);
    }

    // Award points for correct answers
    if (correct) {
      addPoints(exercise.points);
    }
  };

  const nextExercise = () => {
    if (!lesson) return;
    
    if (currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setShowResult(false);
      setExerciseAnswer('');
      setFeedback('');
    } else {
      // Lesson complete
      completLesson();
    }
  };

  const completLesson = () => {
    if (!lesson) return;
    
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer.toLowerCase().trim() === lesson.exercises[index].correctAnswer.toLowerCase().trim()
    ).length;
    
    const totalQuestions = lesson.exercises.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    
    // Award bonus points for completion
    addPoints(lesson.points);
    
    // Check for first lesson achievement
    if (lesson.exercises.length > 0) {
      unlockAchievement('first_lesson');
    }
    
    toast({
      title: t('lessonComplete'),
      description: `${correctAnswers}/${totalQuestions} correct! You earned ${lesson.points} IP!`,
      variant: "default"
    });
    
    navigate('/lessons');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Maya3D height="200px" showMessage={true} message="Loading your lesson..." />
          <p className="text-glass-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-glass-foreground">Lesson not found</p>
          <Button onClick={() => navigate('/lessons')}>Back to Lessons</Button>
        </div>
      </div>
    );
  }

  const exercise = lesson.exercises[currentExercise];
  const progress = ((currentExercise + 1) / lesson.exercises.length) * 100;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/lessons')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('back')}
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-glass-foreground">{lesson.title}</h1>
            <p className="text-sm text-muted-foreground">
              Exercise {currentExercise + 1} of {lesson.exercises.length}
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Progress</div>
            <div className="font-semibold text-glass-foreground">{Math.round(progress)}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="mb-8 h-2" />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Exercise Content */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-glass/20 backdrop-blur-sm border-glass-border">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-glass-foreground mb-4">
                    {exercise.question}
                  </h2>
                </div>

                {/* Exercise Interface */}
                {exercise.type === 'multiple-choice' && exercise.options && (
                  <RadioGroup
                    value={exerciseAnswer}
                    onValueChange={setExerciseAnswer}
                    disabled={showResult}
                  >
                    <div className="space-y-3">
                      {exercise.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
                            showResult
                              ? option === exercise.correctAnswer
                                ? 'bg-success/20 border-success'
                                : option === exerciseAnswer && option !== exercise.correctAnswer
                                ? 'bg-destructive/20 border-destructive'
                                : 'bg-glass/10 border-glass-border'
                              : 'bg-glass/10 border-glass-border hover:bg-glass/20'
                          }`}
                        >
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                          {showResult && option === exercise.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-success" />
                          )}
                          {showResult && option === exerciseAnswer && option !== exercise.correctAnswer && (
                            <XCircle className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {exercise.type === 'fill-blank' && (
                  <div className="space-y-4">
                    <Input
                      value={exerciseAnswer}
                      onChange={(e) => setExerciseAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      disabled={showResult}
                      className={`text-lg p-4 ${
                        showResult
                          ? isCorrect
                            ? 'border-success bg-success/10'
                            : 'border-destructive bg-destructive/10'
                          : 'bg-glass/30 border-glass-border'
                      }`}
                    />
                    {showResult && (
                      <div className="flex items-center space-x-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                        <span className={`font-medium ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                          {isCorrect ? 'Correct!' : `Correct answer: ${exercise.correctAnswer}`}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Feedback */}
                {showResult && feedback && (
                  <Card className="p-4 bg-glass/30 backdrop-blur-sm border-glass-border">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-warning mt-0.5" />
                      <div>
                        <h4 className="font-medium text-glass-foreground mb-2">Maya's Feedback</h4>
                        <p className="text-sm text-muted-foreground">{feedback}</p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between pt-4">
                  <div>
                    {showResult && isCorrect && (
                      <div className="flex items-center space-x-2 text-success">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-medium">+{exercise.points} IP</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-x-3">
                    {!showResult ? (
                      <Button
                        onClick={() => handleAnswer(exerciseAnswer)}
                        disabled={!exerciseAnswer.trim()}
                        variant="gaming"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button onClick={nextExercise} variant="success">
                        {currentExercise < lesson.exercises.length - 1 ? (
                          <>
                            {t('next')} <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        ) : (
                          t('complete')
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Maya Mascot */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Maya3D
                height="300px"
                showMessage={true}
                message={
                  showResult
                    ? isCorrect
                      ? "Excellent work! Keep it up!"
                      : "Don't worry, learning takes practice!"
                    : "Take your time and think carefully!"
                }
              />
              
              <Card className="mt-4 p-4 bg-glass/20 backdrop-blur-sm border-glass-border">
                <div className="text-center space-y-2">
                  <h4 className="font-medium text-glass-foreground">Lesson Progress</h4>
                  <div className="text-2xl font-bold text-primary">
                    {currentExercise + 1}/{lesson.exercises.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {lesson.points} IP total reward
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile padding */}
      <div className="pb-20 md:pb-8"></div>
    </div>
  );
};

export default LessonDetail;