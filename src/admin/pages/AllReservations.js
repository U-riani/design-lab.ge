import React, { useEffect, useState } from "react";
import {
  useDeleteVisitMutation,
  useGetAllVisistsDataQuery,
} from "../../data/visitsSlice";

const AllReservations = () => {
  const { data, refetch } = useGetAllVisistsDataQuery();
  const [showWarningFor, setShowWarningFor] = useState(null); // Track the ID of the item being deleted
  const [deleteVisit] = useDeleteVisitMutation();
  
  // Format visitDate to "dd/mm/yy hh:mm"
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Format visitDate to "dd/mm/yy hh:mm"
  const formatTime = (date, time) => {
    const d = new Date(date);
    return d.toLocaleString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateEndTime = (visitDate, selectedTime) => {
    const date = new Date(visitDate);
    const additionalMinutes = 30 * parseInt(selectedTime, 10); // Convert selectedTime to number
    date.setMinutes(date.getMinutes() + additionalMinutes);
    return formatTime(date);
  };

  const handleDelete = (id) => {
    setShowWarningFor(id); // Set the clicked item ID for delete warning
  };

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleConfirm = async (id) => {
    // Handle confirm delete logic here
    setShowWarningFor(null); // Hide the delete warning after confirming
    console.log(`Deleted reservation with ID: ${id}`);
    try{
      const response = await deleteVisit({id})
      console.log(response)
      if(response) {
        setShowWarningFor(null); // Hide the delete warning after confirming
        refetch()
      }
    }catch(error) {
      alert(error)
      setShowWarningFor(null); // Hide the delete warning after confirming
    }
  };

  const handleCancelDelete = () => {
    setShowWarningFor(null); // Hide the delete warning on cancel
  };

  return (
    <div className="full">
      <div className="visits-container flex flex-col items-center gap-3">
        {data &&
          data.map((el, i) => (
            <div
              key={el._id}
              className="visit-card w-[90%] bg-slate-300 rounded-lg p-4 flex flex-col justify-start items-start lg:flex-row lg:"
            >
              <div className="visit-card-inner-container flex flex-row flex-wrap gap-y-1 gap-x-3">
                {el.visitDate && (
                  <p className="font-bold">
                    {formatDate(el.visitDate)} -{" "}
                    {calculateEndTime(el.visitDate, el.selectedTime)}
                  </p>
                )}
                {el.name && <p>{el.name}</p>}
                {el.email && <p>{el.email}</p>}
                {el.phone && <p>{el.phone}</p>}
                {el.message && <p className="text-orange-800">{el.message}</p>}
              </div>
              <div className="w-full flex flex-col items-end justify-start gap-2">
                <button
                  onClick={() => handleDelete(el._id)}
                  className="bg-red-500 max-w-[150px] my-3 rounded-lg hover:bg-red-700 text-white font-bold px-3 py-1"
                >
                  Delete
                </button>

                {/* Show warning for the clicked item */}
                {showWarningFor === el._id && (
                  <div className="bg-amber-200 rounded-lg">
                    <p className="p-2">
                      Warning! Are you sure you want to delete this reservation?
                    </p>
                    <div className="flex justify-between p-2">
                      <button
                        onClick={() => handleConfirm(el._id)}
                        className="bg-red-500 h-[60px]  rounded-lg hover:bg-red-700 text-white font-bold px-1"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={handleCancelDelete}
                        className="bg-slate-600 h-[60px] rounded-lg hover:bg-green-700 text-white font-bold px-1"
                      >
                        Cancel Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllReservations;
