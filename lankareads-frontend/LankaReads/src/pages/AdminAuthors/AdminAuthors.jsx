import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import './AdminAuthors.css';
import { API_BASE_URL } from '../../apiConfig';

const AdminAuthors = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/author-requests`);
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/author-requests/${id}/approve`, {
        method: 'PATCH'
      });
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="admin-authors-page">
        <div className="container py-5">
          <div className="admin-authors-header">
            <h2>New Author Requests</h2>
            <p>Review and approve author applications</p>
          </div>

          {loading ? (
            <div className="text-center py-5">Loading...</div>
          ) : (
            <div className="row g-4">
              {requests.map((req) => (
                <div className="col-12 col-md-6 col-xl-4" key={req._id}>
                  <div className="author-request-card-admin">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5>{req.name}</h5>
                        <p className="mb-1">{req.email}</p>
                        <p className="mb-1">{req.contactNumber}</p>
                      </div>
                      <span className={`status-badge ${req.status}`}>{req.status}</span>
                    </div>
                    <p><strong>Books written:</strong> {req.booksWritten}</p>
                    <p>{req.message || 'No additional message provided.'}</p>
                    {req.status !== 'approved' && (
                      <button className="approve-btn" onClick={() => approveRequest(req._id)}>
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminAuthors;
