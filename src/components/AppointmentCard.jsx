const getStatusBadge = (status) => {
  switch (status) {
    case 'Pending':
      return <span className="badge badge-status badge-status-pending"><i className="bi bi-hourglass-split"></i> Pending Approval</span>;
    case 'Confirmed':
      return <span className="badge badge-status badge-status-confirmed"><i className="bi bi-check2-circle"></i> Confirmed Slot</span>;
    case 'In Progress':
      return <span className="badge badge-status badge-status-in-progress"><i className="bi bi-gear-wide-connected spin"></i> In Progress</span>;
    case 'Completed':
      return <span className="badge badge-status badge-status-completed"><i className="bi bi-patch-check-fill"></i> Completed</span>;
    case 'Cancelled':
      return <span className="badge badge-status badge-status-cancelled"><i className="bi bi-x-circle"></i> Cancelled</span>;
    default:
      return <span className="badge bg-secondary">{status}</span>;
  }
};

const AppointmentCard = ({ appointment, onCancel, onViewInvoice }) => {
  const canCancel = appointment.status === 'Pending' || appointment.status === 'Confirmed';

  return (
    <div className="card carcare-card border-0 mb-3 p-3 p-lg-4">
      <div className="card-body p-0">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pb-3 border-bottom mb-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h5 className="fw-bold text-dark mb-0">{appointment.serviceName}</h5>
              <span className="font-monospace text-muted small">#{appointment.id}</span>
            </div>
            <div className="text-secondary small d-flex flex-wrap align-items-center gap-3">
              <span><i className="bi bi-calendar-event me-1 text-primary"></i>{appointment.date}</span>
              <span><i className="bi bi-clock me-1 text-primary"></i>{appointment.timeSlot}</span>
              <span><i className="bi bi-car-front me-1 text-primary"></i>{appointment.vehicleInfo}</span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            {getStatusBadge(appointment.status)}
          </div>
        </div>

        <div className="row g-3 align-items-center">
          <div className="col-md-7">
            <div className="small text-secondary mb-1">
              <strong className="text-dark">Assigned Master Mechanic:</strong>{' '}
              {appointment.assignedMechanic || 'Pending Assignment'}
            </div>

            {appointment.customerNotes && (
              <div className="small text-secondary mb-1">
                <strong className="text-dark">Issue / Notes:</strong> {appointment.customerNotes}
              </div>
            )}

            {appointment.technicianNotes && (
              <div className="small bg-light p-2 rounded-2 mt-2 border-start border-primary border-3">
                <strong className="text-primary">Technician Feedback:</strong>{' '}
                <span className="text-dark">{appointment.technicianNotes}</span>
              </div>
            )}
          </div>

          <div className="col-md-5 text-md-end pt-2 pt-md-0 border-top border-md-top-0">
            <div className="mb-2">
              <span className="text-secondary small d-block">Estimated Total</span>
              <span className="fs-4 fw-bold text-dark">${Number(appointment.totalCost || 0).toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-md-end gap-2">
              {onViewInvoice && (
                <button
                  onClick={() => onViewInvoice(appointment)}
                  className="btn btn-outline-primary btn-sm px-3 rounded-3 d-flex align-items-center gap-1"
                >
                  <i className="bi bi-receipt"></i>
                  <span>Invoice</span>
                </button>
              )}

              {canCancel && onCancel && (
                <button
                  onClick={() => onCancel(appointment.id)}
                  className="btn btn-outline-danger btn-sm px-3 rounded-3 d-flex align-items-center gap-1"
                >
                  <i className="bi bi-x-lg"></i>
                  <span>Cancel Booking</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
