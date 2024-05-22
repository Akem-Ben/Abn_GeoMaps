import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { editMarkers, getSingleMarker } from "@/axios-setup/functions/functions";
import { showErrorToast, showSuccessToast } from "@/utilities/toastify";
import { MarkerContext } from "@/contexts/markerContext";

const Markers = ({ id, markerDisplayName, markerName, latitude, longitude }: any) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [editLoading, setEditLoading] = useState(false)

  const [deleteLoading, setDeleteLoading] = useState(false)

  const [modalMarker, setModalMarker] = useState<any>({
    markerDisplayName: "",
    latitude: 0,
    longitude: 0,
  });

  const {allUserMarkers} = useContext(MarkerContext)

  const [edit, setEdit] = useState("");

  const modalRef = useRef(null);

  const closeModal = () => {
    setModalMarker({ markerDisplayName: "", latitude: 0, longitude: 0 });
    setModalOpen(false);
    setEdit('')
    setEditLoading(false)
    setDeleteLoading(false)
    setLoading(false); // Reset loading state
    return;
  };

  const details = async (_id: string) => {
    if (loading || modalOpen) return;
    setLoading(true);
    try {
      const response = await getSingleMarker(_id);
      setModalMarker(response.data.marker);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const editMarkerTitle = async(_id:string)=>{
    try{
      setEditLoading(true)

      if(edit.length === 0 || edit === ''){
        setEditLoading(false)
        return showErrorToast('You need to add a new title if you want to change the title')
      }

      const data = {'title': edit}

      const response = await editMarkers(_id, data)

      if(response.status !== 200){
        setEditLoading(false)
        return showErrorToast(response.data.message)
      }

      setEdit('')
      setEditLoading(false)
      setDeleteLoading(false)
      const editor = await getSingleMarker(_id);
      setModalMarker(editor.data.marker);
      showSuccessToast(response.data.message)

      return allUserMarkers()
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        return showErrorToast("Internal Server Error");
      } else if (error.request) {
        console.log(error.request);
        return showErrorToast(error.request);
      } else {
        console.log("Error", error.message);
        return showErrorToast(error.request);
      }
    }
  }

  const deleteMarker = async(_id:string) => {
    try{
      setDeleteLoading(true)
    }catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        return showErrorToast("Internal Server Error");
      } else if (error.request) {
        console.log(error.request);
        return showErrorToast(error.request);
      } else {
        console.log("Error", error.message);
        return showErrorToast(error.request);
      }
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      // if (modalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
      //   closeModal();
      // }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalOpen]);

  return (
    // <div></div>
    <>
    <div className="bg-gray-300 hover:bg-gray-400 w-[80%] rounded-lg h-[200px] flex flex-col px-2 py-2 gap-2 items-start justify-center">
    <div className="w-full h-[70%] hover:cursor-pointer px-3 py-2" onClick={() => details(id)}>
      <div className="">
        <span className="font-semibold">Title:</span>{" "}
        {markerDisplayName.substr(0, 10) + "..."}
      </div>
      <div>
        <span className="font-semibold">Location:</span>{" "}
        {markerName.substr(0, 10) + "..."}
      </div>
      <div>
        <span className="font-semibold">Latitude:</span>{" "}
        {`${latitude.toString().substr(0, 11) + "..."}`}
      </div>
      <div>
        <span className="font-semibold">Longitude:</span>{" "}
        {`${longitude.toString().substr(0, 11) + "..."}`}
      </div>

    </div>
      <div className=" w-full flex items-center justify-center gap-3 mt-2">
        <button onClick={()=>details(id)} className="rounded-lg border p-2 bg-green-950 text-white hover:cursor-pointer hover:bg-green-500 hover:text-white">
          Edit
        </button>
        <button onClick={()=> deleteMarker(id)} className="rounded-lg border p-2 bg-red-950 text-white hover:cursor-pointer hover:bg-red-500 hover:text-white">
          {deleteLoading ? 'Deleting...' : 'Delete'}
        </button>
        </div>
      </div>
      {modalOpen && (
        <Modal onClose={() => closeModal()}>
          <div className="bg-gray-200 w-full mb-3 h-[400px] overflow-y-scroll p-4">
            <div className="text-green-800 flex justify-center font-bold">
              Location details (You can only edit the title) 😊
            </div>
            <div>
              <div className="flex flex-col py-7 items-center justify-between p-3 mb-2 border rounded-lg">
                <div className="flex gap-3 item-center w-full justify-center items-center mt-4">
                  <span className="font-bold">Title:</span>{" "}
                  <textarea
                    placeholder={modalMarker.markerDisplayName}
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                    className="border-2 rounded-lg p-3 w-[60%] flex justify-center items-center"
                  />
                  <button onClick={()=> editMarkerTitle(id)} className="border-2 border-green-300 hover:bg-white hover:text-green-700 text-white bg-green-700 p-3 rounded-lg">
                    { editLoading ? 'Changing...' : 'Save Changes'}
                  </button>
                </div>
                <div className="flex gap-3 item-center w-full justify-center items-center mt-4">
                  <span className="font-bold">Location:</span>{" "}
                  <span className="border w-full border-lg bg-gray-300">
                    <textarea
                      placeholder={modalMarker.markerName}
                      value={modalMarker.markerName}
                      disabled
                      className="border-2 rounded-lg p-3 w-full flex justify-center items-center"
                    />
                  </span>
                </div>
                <div className="flex gap-3 item-center w-full justify-center items-center mt-4">
                  <span className="font-bold">Longitude:</span>{" "}
                  <span className="border w-full border-lg bg-gray-300">
                    <textarea
                      placeholder={modalMarker.latitude}
                      value={modalMarker.latitude}
                      disabled
                      className="border-2 rounded-lg p-3 w-full flex justify-center items-center"
                    />
                  </span>
                </div>
                <div className="flex gap-3 item-center w-full justify-center items-center mt-4">
                  <span className="font-bold">Latitude:</span>{" "}
                  <span className="border w-full border-lg bg-gray-300">
                    <textarea
                      placeholder={modalMarker.longitude}
                      value={modalMarker.longitude}
                      disabled
                      className="border-2 rounded-lg p-3 w-full flex justify-center items-center"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Markers;
