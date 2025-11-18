import { Course } from "@shared/schema";

export const courses: Record<string, Course> = {
  orientation_common: {
    id: "orientation_common",
    title: "SHARE Staff Orientation",
    description: "Welcome to SHARE Mobile Clinic! Learn about our mission, values, and commitment to providing healthcare to underserved communities in Haiti.",
    lessons: [
      {
        id: "l1",
        title: "Welcome to SHARE",
        content: `# Welcome to SHARE Mobile Clinic

We're thrilled to have you join our team! SHARE Mobile Clinic has been serving communities in Haiti since its founding, bringing essential healthcare services directly to those who need it most.

## What Makes SHARE Special

Our mobile clinic travels to remote villages and underserved areas, providing:
- Primary healthcare services
- Preventive care and health education
- Emergency medical treatment
- Community health partnerships

## Your Role

As a member of the SHARE team, you play a crucial part in our mission. Whether you're a healthcare provider, administrator, investor, or partner, your contribution helps us reach more people and save more lives.

## Getting Started

This orientation will guide you through:
- Our mission and values
- How we operate in Haiti
- Your responsibilities and opportunities
- Resources available to you

Let's begin this journey together!`,
      },
      {
        id: "l2",
        title: "Our Mission & Values",
        content: `# SHARE's Mission & Core Values

## Our Mission

To provide accessible, high-quality healthcare to underserved communities in Haiti through mobile medical services, health education, and community partnerships.

## Core Values

### Compassion
We treat every patient with dignity, respect, and kindness. Healthcare is a human right, and we're committed to serving all people regardless of their ability to pay.

### Excellence
We maintain the highest standards of medical care and professionalism in everything we do. Our team is dedicated to continuous learning and improvement.

### Community Partnership
We work alongside local communities, respecting their culture and involving them in health decisions. Sustainable healthcare requires community ownership.

### Innovation
We find creative solutions to overcome barriers to healthcare access. Our mobile clinic model brings services directly to those who need them most.

### Integrity
We operate with transparency and accountability to our patients, partners, and supporters. Trust is the foundation of effective healthcare.

## Impact by the Numbers

- **Communities Served**: Over 50 rural villages
- **Patients Treated**: Thousands annually
- **Healthcare Workers**: Dedicated local and international staff
- **Mobile Units**: Operating across multiple regions

Together, we're making a difference in Haiti, one community at a time.`,
      },
      {
        id: "l3",
        title: "Working in Haiti",
        content: `# Working with SHARE in Haiti

## Understanding the Context

Haiti faces unique healthcare challenges:
- Limited access to medical facilities in rural areas
- Economic barriers to healthcare
- Need for culturally sensitive care
- Opportunity to make a real impact

## The Mobile Clinic Approach

### How It Works

1. **Community Outreach**: We partner with local leaders to identify needs
2. **Scheduled Visits**: Regular routes ensure consistent care
3. **Comprehensive Services**: From checkups to treatment
4. **Follow-up Care**: Building long-term relationships

### What to Expect

- Working in diverse, often remote locations
- Adapting to local conditions and resources
- Collaborating with Haitian healthcare workers
- Making a visible difference in people's lives

## Cultural Considerations

- Respect for local customs and traditions
- Language: Haitian Creole and French are primary languages
- Building trust takes time and consistency
- Community involvement is essential

## Safety & Support

We prioritize the safety and wellbeing of our team:
- Comprehensive training before deployment
- Local partnerships and support systems
- Communication protocols
- Health and safety guidelines

Your safety and success are our priorities.`,
      },
    ],
    quizzes: [
      {
        id: "q1",
        title: "Orientation Quiz",
        questions: [
          {
            question: "What is SHARE Mobile Clinic's primary mission?",
            choices: [
              "To build permanent hospitals in Haiti",
              "To provide accessible healthcare to underserved communities through mobile services",
              "To train doctors in urban areas",
              "To conduct medical research",
            ],
            correctAnswer: 1,
          },
          {
            question: "Which of the following is NOT one of SHARE's core values?",
            choices: [
              "Compassion",
              "Profit maximization",
              "Community Partnership",
              "Excellence",
            ],
            correctAnswer: 1,
          },
          {
            question: "How does the mobile clinic approach work?",
            choices: [
              "Patients must travel to a central location",
              "Services are only available online",
              "The clinic travels to communities on scheduled visits",
              "Treatment is only provided in emergencies",
            ],
            correctAnswer: 2,
          },
          {
            question: "What languages are primarily spoken in Haiti?",
            choices: [
              "English and Spanish",
              "French and Portuguese",
              "Haitian Creole and French",
              "English and French",
            ],
            correctAnswer: 2,
          },
          {
            question: "According to the training, what is essential for sustainable healthcare in communities?",
            choices: [
              "Community ownership and partnership",
              "Advanced technology only",
              "International staff exclusively",
              "Urban facilities",
            ],
            correctAnswer: 0,
          },
        ],
      },
    ],
  },
};

export function getCourse(courseId: string): Course | undefined {
  return courses[courseId];
}

export function getAllCourses(): Course[] {
  return Object.values(courses);
}
