import { Link, useRoute } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle2, FileQuestion, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserCourse } from '@shared/schema';
import { getCourse } from '@/lib/courses';
import { useQuery } from '@tanstack/react-query';

export default function Course() {
  const [, params] = useRoute('/course/:courseId');
  const { user } = useAuth();

  const course = params?.courseId ? getCourse(params.courseId) : null;

  const { data: userCourse, isLoading } = useQuery<UserCourse>({
    queryKey: [`/api/user-courses/${params?.courseId}?userId=${user?.id}`],
    enabled: !!user && !!params?.courseId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course || !userCourse) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold mb-2">Course Not Found</h2>
            <p className="text-muted-foreground mb-6">
              This course doesn't exist or you don't have access to it.
            </p>
            <Button onClick={() => window.location.href = '/dashboard'}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const lessonsCompleted = userCourse.lessonsCompleted as string[];
  const quizzesCompleted = userCourse.quizzesCompleted as string[];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" onClick={() => window.location.href = '/dashboard'} data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl md:text-3xl mb-2" data-testid="text-course-title">
                  {course.title}
                </CardTitle>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
              {userCourse.completedAt && (
                <Badge className="bg-chart-2 text-white" data-testid="badge-completed">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium" data-testid="text-progress">
                {userCourse.progressPercentage}%
              </span>
            </div>
            <Progress value={userCourse.progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Lessons
            </h2>
            <div className="space-y-3">
              {course.lessons.map((lesson, index) => {
                const isCompleted = lessonsCompleted.includes(lesson.id);
                return (
                  <Link key={lesson.id} href={`/course/${course.id}/lesson/${lesson.id}`} data-testid={`link-lesson-${lesson.id}`}>
                    <Card className="hover-elevate">
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold">{lesson.title}</h3>
                          </div>
                        </div>
                        {isCompleted && (
                          <Badge className="bg-chart-2 text-white" data-testid={`badge-lesson-completed-${lesson.id}`}>
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileQuestion className="w-6 h-6" />
              Quizzes
            </h2>
            <div className="space-y-3">
              {course.quizzes.map((quiz, index) => {
                const isCompleted = quizzesCompleted.includes(quiz.id);
                return (
                  <Link key={quiz.id} href={`/course/${course.id}/quiz/${quiz.id}`} data-testid={`link-quiz-${quiz.id}`}>
                    <Card className="hover-elevate">
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                            Q{index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold">{quiz.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {quiz.questions.length} questions
                            </p>
                          </div>
                        </div>
                        {isCompleted && (
                          <Badge className="bg-chart-2 text-white" data-testid={`badge-quiz-completed-${quiz.id}`}>
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
