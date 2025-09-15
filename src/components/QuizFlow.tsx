import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ConfettiAnimation, CelebrationEffect } from '@/components/ConfettiAnimation';
import { PointsDisplay } from '@/components/PointsDisplay';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Star,
  ArrowRight,
  Award,
  TrendingUp,
  Gift
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const sampleQuiz: Question[] = [
  {
    id: 1,
    question: "Which energy source is renewable?",
    options: ["Coal", "Solar", "Oil", "Natural Gas"],
    correct: 1,
    explanation: "Solar energy is renewable because it comes from the sun which won't run out!"
  },
  {
    id: 2,
    question: "What percentage of Earth's water is fresh water?",
    options: ["50%", "25%", "3%", "75%"],
    correct: 2,
    explanation: "Only about 3% of Earth's water is fresh water that we can use!"
  },
  {
    id: 3,
    question: "How long does a plastic bottle take to decompose?",
    options: ["1 year", "10 years", "100 years", "450 years"],
    correct: 3,
    explanation: "Plastic bottles take about 450 years to decompose - that's why recycling is important!"
  }
];

interface QuizFlowProps {
  onComplete: (points: number, badge: any) => void;
  onClose: () => void;
}

export const QuizFlow: React.FC<QuizFlowProps> = ({ onComplete, onClose }) => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentStep, setCurrentStep] = useState<'quiz' | 'points' | 'leaderboard' | 'badge' | 'rewards'>('quiz');

  const currentQ = sampleQuiz[currentQuestion];
  const isLastQuestion = currentQuestion === sampleQuiz.length - 1;
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / sampleQuiz.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQ.correct;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
      setShowConfetti(true);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (isLastQuestion) {
        // Quiz completed - start the flow
        setCurrentStep('points');
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowConfetti(false);
      }
    }, 2000);
  };

  const earnedPoints = score * 50; // 50 points per correct answer
  const earnedBadge = score >= 2 ? {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Scored 2+ in Environmental Quiz',
    icon: '🧠',
    type: 'gold' as const,
    earnedAt: new Date()
  } : null;

  const handleFlowNext = () => {
    switch (currentStep) {
      case 'points':
        setCurrentStep('leaderboard');
        break;
      case 'leaderboard':
        if (earnedBadge) {
          setCurrentStep('badge');
          setShowCelebration(true);
        } else {
          setCurrentStep('rewards');
        }
        break;
      case 'badge':
        setCurrentStep('rewards');
        break;
      case 'rewards':
        onComplete(earnedPoints, earnedBadge);
        break;
    }
  };

  if (currentStep === 'points') {
    return (
      <Card className="card-hover animate-slide-up">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-reward rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
            <Star className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Great Job! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <p className="text-muted-foreground mb-4">You scored {score} out of {sampleQuiz.length} questions!</p>
            <PointsDisplay 
              points={earnedPoints}
              change={earnedPoints}
              size="lg"
              label="Eco Points Earned"
              className="justify-center"
            />
          </div>
          <Button onClick={handleFlowNext} variant="eco" size="lg" className="w-full">
            <TrendingUp className="mr-2 h-5 w-5" />
            Check Leaderboard
          </Button>
        </CardContent>
        <ConfettiAnimation trigger={true} />
      </Card>
    );
  }

  if (currentStep === 'leaderboard') {
    return (
      <Card className="card-hover animate-slide-up">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-badge-gold to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Leaderboard Updated! 📈</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Your New Rank:</span>
              <Badge className="bg-badge-gold/10 text-badge-gold">#2 🥈</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Points:</span>
              <span className="font-bold text-points">2,530</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Top 3 Students:</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-badge-gold/10 rounded">
                <span>🥇 Priya S.</span>
                <span className="font-bold">2,650 pts</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-badge-silver/10 rounded border-2 border-primary">
                <span>🥈 You!</span>
                <span className="font-bold">2,530 pts</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-badge-bronze/10 rounded">
                <span>🥉 Arjun P.</span>
                <span className="font-bold">2,480 pts</span>
              </div>
            </div>
          </div>

          <Button onClick={handleFlowNext} variant="reward" size="lg" className="w-full">
            <ArrowRight className="mr-2 h-5 w-5" />
            {earnedBadge ? 'Claim Your Badge!' : 'View Rewards'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 'badge' && earnedBadge) {
    return (
      <Card className="card-hover animate-slide-up">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-4">New Badge Earned! 🏆</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="flex justify-center">
            <BadgeDisplay 
              badge={earnedBadge}
              size="lg"
              showDescription
              className="animate-glow"
            />
          </div>
          
          <div className="bg-gradient-eco/10 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">{earnedBadge.name}</h3>
            <p className="text-muted-foreground">{earnedBadge.description}</p>
          </div>

          <Button onClick={handleFlowNext} variant="eco" size="lg" className="w-full">
            <Gift className="mr-2 h-5 w-5" />
            View Rewards Screen
          </Button>
        </CardContent>
        <CelebrationEffect show={showCelebration} />
      </Card>
    );
  }

  if (currentStep === 'rewards') {
    return (
      <Card className="card-hover animate-slide-up">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Rewards Updated! 🎁</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Your achievements have been added to your profile!</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-points/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-points">+{earnedPoints}</div>
              <div className="text-sm text-muted-foreground">Points Added</div>
            </div>
            {earnedBadge && (
              <div className="bg-badge-gold/10 p-4 rounded-lg text-center">
                <div className="text-2xl">🏆</div>
                <div className="text-sm text-muted-foreground">New Badge</div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Unlocked Rewards:</h4>
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <div>
                  <div className="font-medium">Plant Sapling Kit</div>
                  <div className="text-sm text-muted-foreground">Now available for 300 points!</div>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={() => onComplete(earnedPoints, earnedBadge)} variant="eco" size="lg" className="w-full">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Complete Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">🧠 Environmental Quiz</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {sampleQuiz.length}</span>
            <span>Score: {score}/{answers.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  showResult 
                    ? index === currentQ.correct 
                      ? 'success'
                      : index === selectedAnswer && index !== currentQ.correct
                        ? 'destructive'
                        : 'outline'
                    : selectedAnswer === index 
                      ? 'default' 
                      : 'outline'
                }
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => handleAnswer(index)}
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  {showResult && (
                    <>
                      {index === currentQ.correct && <CheckCircle2 className="h-5 w-5 text-success" />}
                      {index === selectedAnswer && index !== currentQ.correct && <XCircle className="h-5 w-5 text-destructive" />}
                    </>
                  )}
                  <span>{option}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="bg-muted/50 p-4 rounded-lg animate-slide-up">
            <div className="flex items-start gap-2">
              {selectedAnswer === currentQ.correct ? (
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-medium mb-1">
                  {selectedAnswer === currentQ.correct ? 'Correct! +50 points 🎉' : 'Incorrect'}
                </p>
                <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={handleNext}
          disabled={selectedAnswer === null || showResult}
          variant="eco"
          size="lg"
          className="w-full"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
      
      <ConfettiAnimation trigger={showConfetti} />
    </Card>
  );
};