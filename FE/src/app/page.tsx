"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Kol {
	KolID: number;
	UserProfileID: number;
	Language: string;
	Education: string;
	ExpectedSalary: number;
	ExpectedSalaryEnable: boolean;
	ChannelSettingTypeID: number;
	IDFrontURL: string;
	IDBackURL: string;
	PortraitURL: string;
	RewardID: number;
	PaymentMethodID: number;
	TestimonialsID: number;
	VerificationStatus: boolean;
	Enabled: boolean;
	ActiveDate: Date;
	Active: boolean;
	CreatedBy: string;
	CreatedDate: Date;
	ModifiedBy: string;
	ModifiedDate: Date;
	IsRemove: boolean;
	IsOnBoarding: boolean;
	Code: string;
	PortraitRightURL: string;
	PortraitLeftURL: string;
	LivenessStatus: boolean;
}
  
interface ApiResponse {
  result: string;
  errorMessage: string;
  pageIndex: number;
  pageSize: number;
  guid: string;
  totalCount: number;
  KolInformation: Kol[];
}

const Page = () => {
  const [kols, setKols] = useState<Kol[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKols = async () => {
      try {
        const response = await axios.get<ApiResponse>("http://localhost:8081/kols", {
          params: { pageIndex: 1, pageSize: 29 },
        });

        if (response.data.result === "Success") {
          setKols(response.data.KolInformation);
        } else {
          setError(response.data.errorMessage || "Failed to fetch KOL data");
        }
      } catch (err) {
        setError("Error fetching KOL data: " + (err as Error).message);
      }
    };

    fetchKols();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-purple-600 flex items-center justify-between">
          <h2 className="text-white text-2xl font-semibold">KOL List</h2>
        </div>
        {error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : (
          <div
            id="kol-table-container"
            className="overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  {Object.keys(kols[0] || {}).map((key) => (
                    <th key={key} className="py-3 px-6">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {kols.map((kol) => (
                  <tr
                    key={kol.KolID}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    {Object.entries(kol).map(([key, value]) => (
                      <td key={key} className="py-3 px-6 whitespace-nowrap">
                        {key.toLowerCase().includes("url") ? (
                          <img
                            src={value as string}
                            alt={key}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : typeof value === "boolean" ? (
                          value ? "Yes" : "No"
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page; 