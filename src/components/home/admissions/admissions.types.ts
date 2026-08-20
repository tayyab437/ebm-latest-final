export interface AdmissionStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
  iconName: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  annualPrice: string;
  recommended: boolean;
  popular: boolean;
  badge?: string;
  features: string[];
  aiFeatures: string[];
  supportLevel: string;
  learningResources: string;
  assessmentAccess: string;
  parentDashboard: boolean;
  certificateEligible: boolean;
}

export interface ComparisonFeature {
  id: string;
  category: string;
  name: string;
  starter: boolean | string;
  student: boolean | string;
  premium: boolean | string;
  family: boolean | string;
  institution: boolean | string;
}

export interface Scholarship {
  id: string;
  title: string;
  eligibility: string;
  description: string;
  discountPercentage: string;
  iconName: string;
}

export interface AdmissionRequirement {
  id: string;
  category: string;
  title: string;
  status: "required" | "optional" | "recommended";
  description: string;
  devices?: string[];
}

export interface EnrollmentEstimate {
  grade: string;
  goal: string;
  planId: string;
  mode: string;
  durationMonths: number;
  expectedCompletion: string;
  recommendedAITools: string[];
  estimatedFee: string;
}

export interface AdmissionFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ConsultationOption {
  id: string;
  title: string;
  description: string;
  iconName: string;
  actionText: string;
  contactValue: string;
}

// FUTURE API Service Interface
export interface IAdmissionsService {
  getPricingPlans(): Promise<PricingPlan[]>;
  getComparisonFeatures(): Promise<ComparisonFeature[]>;
  getAdmissionSteps(): Promise<AdmissionStep[]>;
  getAdmissionRequirements(): Promise<AdmissionRequirement[]>;
  getAdmissionFAQs(): Promise<AdmissionFAQ[]>;
  getScholarships(): Promise<Scholarship[]>;
  getConsultationOptions(): Promise<ConsultationOption[]>;
  submitEnrollmentRequest(data: any): Promise<{ success: boolean; requestId: string }>;
  submitConsultationRequest(data: any): Promise<{ success: boolean; requestId: string }>;
}
