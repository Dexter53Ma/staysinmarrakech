"use client";

import { useEffect, useState } from "react";
import { Icon, faEnvelope, faCheck, faTimes } from "@/components/icons";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/newsletter")
      .then((r) => r.json())
      .then((data) => {
        setSubscribers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeCount = subscribers.filter((s) => s.isActive).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
        <p className="text-gray-500 text-sm mt-1">Gérer les inscriptions à la newsletter</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Icon icon={faEnvelope} className="text-[#0d47a1]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
              <p className="text-xs text-gray-500">Total inscrits</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Icon icon={faCheck} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
              <p className="text-xs text-gray-500">Actifs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <Icon icon={faTimes} className="text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{subscribers.length - activeCount}</p>
              <p className="text-xs text-gray-500">Désabonnés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Chargement...</div>
        ) : subscribers.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Icon icon={faEnvelope} className="text-3xl mb-2" />
            <p>Aucun inscrit pour le moment</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Email</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Nom</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Statut</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{sub.email}</td>
                    <td className="px-5 py-3 text-gray-500">{sub.name || "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${sub.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {sub.isActive ? "Actif" : "Désabonné"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400">
                      {new Date(sub.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
