import React, { useEffect } from "react";
import useAuthStore from "../stores/useUserStore";
import StudentDetails from "../components/StudentDetails";
import AssignedProducts from "../components/AssignedProducts";

const DashboardPage = ({ role }) => {
  const { student, fetchStudentDetails } = useAuthStore();

  useEffect(() => {
    fetchStudentDetails("student");
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-1xl mx-auto bg-gray-900 text-white shadow-md">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">
        Student Dashboard
      </h2>

      {student ? (
        <>
          <StudentDetails student={student} role={role} />
          <AssignedProducts products={student.assignedProducts} />
        </>
      ) : (
        <p className="text-gray-300">Loading student details...</p>
      )}
    </div>
  );
};

export default DashboardPage;
