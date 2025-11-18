import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserCourse } from '@shared/schema';
import { getCourse } from '@/lib/courses';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
  const { user } = useAuth();

  const { data: userCourses = [], isLoading } = useQuery<UserCourse[]>({
    queryKey: [`/api/user-courses?userId=${user?.id}`],
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-dashboard-title">
            My Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Track your progress and continue learning.
          </p>
        </div>

        {userCourses.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">No Courses Assigned Yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't been assigned any courses yet. Please contact your administrator to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCourses.map((userCourse) => {
              const course = getCourse(userCourse.courseId);
              if (!course) return null;

              const totalItems = course.lessons.length + course.quizzes.length;
              const completedItems = (userCourse.lessonsCompleted as string[]).length + (userCourse.quizzesCompleted as string[]).length;

              return (
                <Link key={userCourse.id} href={`/course/${course.id}`} data-testid={`link-course-${course.id}`}>
                  <Card className="hover-elevate h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        {userCourse.completedAt ? (
                          <Badge className="bg-chart-2 text-white" data-testid={`badge-completed-${course.id}`}>
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="secondary" data-testid={`badge-progress-${course.id}`}>
                            <Clock className="w-3 h-3 mr-1" />
                            In Progress
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium" data-testid={`text-progress-${course.id}`}>
                            {userCourse.progressPercentage}%
                          </span>
                        </div>
                        <Progress value={userCourse.progressPercentage} className="h-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Lessons</p>
                          <p className="font-medium" data-testid={`text-lessons-${course.id}`}>
                            {(userCourse.lessonsCompleted as string[]).length} / {course.lessons.length}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Quizzes</p>
                          <p className="font-medium" data-testid={`text-quizzes-${course.id}`}>
                            {(userCourse.quizzesCompleted as string[]).length} / {course.quizzes.length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
