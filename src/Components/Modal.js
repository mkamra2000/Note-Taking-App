import React, { useEffect, useState } from "react";

function Modal(props) {
  const [descMust, setDescMust] = useState(true);
  const [showDescErr, setShowDescErr] = useState(false);
  const [showTitleErr, setShowTitleErr] = useState(false);
  const [uniqueTitle, setUniqueTitle] = useState(true);
  // Checking:
  // --> Title is Unique or not
  // --> Description is mandatory or not
  useEffect(() => {
    if (props.title.length >= 10) {
      setDescMust(false);
      setShowDescErr(false);
    }
    let notesArr = props.notes;
    let flag = true;
    notesArr.forEach((note) => {
      if (note.title === props.title) {
        flag = false;
      }
    });
    setUniqueTitle(flag);
  }, [props.title]);
  // Closing Modal
  function closeModal() {
    props.setModal(false);
    if(props.modalBtn==="Edit"){
      btnClick();
    }
  }
  // Handle Title Change
  function titleChange(e) {
    props.setTitle(e.target.value);
    if (showTitleErr) {
      setShowTitleErr(false);
    }
  }
  // Handle Description Change
  function descChange(e) {
    props.setDesc(e.target.value);
    if (showDescErr) {
      setShowDescErr(false);
    }
  }
  function btnClick() {
    if (props.title.length === 0) {
      setShowTitleErr(true);
    }
    if (descMust && props.desc.length === 0) {
      setShowDescErr(true);
    }
    if (
      props.title.length > 0 &&
      !showTitleErr &&
      !showDescErr &&
      (!descMust || props.desc.length > 0) &&
      uniqueTitle
    ) {
      let notesArr = props.notes;
      let note = {
        title: props.title,
        desc: props.desc,
      };
      notesArr.push(note);
      localStorage.setItem("notes", JSON.stringify(notesArr));
      props.setNotes(notesArr);
      props.setModal(false);
    }
  }
  return (
    <div className="modal h-screen flex flex-col justify-center items-center">
      <button className="fixed top-8 right-8" onClick={closeModal}>
        <svg
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="30px"
          height="30px"
        >
          {" "}
          <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
        </svg>
      </button>
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-2xl font-medium mb-4">{props.modalTitle}</div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2 text-left text-md"
              htmlFor="title"
            >
              Title
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              value={props.title}
              rows={3}
              onChange={titleChange}
            />
            {showTitleErr && (
              <p className="text-red-500 text-xs italic text-left mt-2">
                Please add title.
              </p>
            )}
            {!uniqueTitle && (
              <p className="text-red-500 text-xs italic text-left mt-2">
                Title must be unique.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2 text-left text-md"
              htmlFor="desc"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline focus:shadow-outline"
              id="desc"
              type="text"
              rows={3}
              placeholder="Description"
              value={props.desc}
              onChange={descChange}
            />
            {showDescErr && (
              <p className="text-red-500 text-xs italic text-left">
                Please add description.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={btnClick}
            >
              {props.modalBtn}
            </button>
          </div>
        </form>
      </div>
      <div className="my-1 text-xl relative text-white">
        Created By{" "}
        <a href="https://mayankkamra.netlify.app/" target={"_blank"} rel={"noreferrer"}>
          <u>Mayank Kamra</u>
        </a>
      </div>
    </div>
  );
}

export default Modal;
