import React, { Fragment, Suspense, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import ErrorBoundary from "../../components/ErrorBoundary";
const PreferencesContainer = React.lazy(() => import("./PreferencesContainer"));

const Prefrences = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-xs lg:text-base">
      <button id="preferencesBtn" aria-label="PreferencesSetting" onClick={() => setIsOpen(true)} >
        {props.button}
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <PreferencesContainer setIsOpen={setIsOpen} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </Dialog>
      </Transition >
    </div>)
}

export default Prefrences;