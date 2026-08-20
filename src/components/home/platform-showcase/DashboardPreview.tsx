import React from "react";
import { StudentPreview } from "./StudentPreview";
import { ParentPreview } from "./ParentPreview";
import { TeacherPreview } from "./TeacherPreview";
import { AdminPreview } from "./AdminPreview";
import { AITutorPreview } from "./AITutorPreview";
import { AssessmentPreview } from "./AssessmentPreview";
import { LibraryPreview } from "./LibraryPreview";
import { AnalyticsPreview } from "./AnalyticsPreview";
import { CertificatesPreview } from "./CertificatesPreview";
import { CommunityPreview } from "./CommunityPreview";

interface DashboardPreviewProps {
  activeTab: string;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ activeTab }) => {
  switch (activeTab) {
    case "student":
      return <StudentPreview />;
    case "parent":
      return <ParentPreview />;
    case "teacher":
      return <TeacherPreview />;
    case "admin":
      return <AdminPreview />;
    case "ai-tutor":
      return <AITutorPreview />;
    case "assessments":
      return <AssessmentPreview />;
    case "library":
      return <LibraryPreview />;
    case "analytics":
      return <AnalyticsPreview />;
    case "certificates":
      return <CertificatesPreview />;
    case "community":
      return <CommunityPreview />;
    default:
      return <StudentPreview />;
  }
};
