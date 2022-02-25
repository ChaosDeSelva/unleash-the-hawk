import React, {Fragment, useEffect, useState} from "react";
import { Hawk } from "../interfaces/Hawk";
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import {API_URL} from "../api/Url";
import AlertModal from "./AlertModal";

export default function HawkDetailsDialog({ details, clearData, reloadHawkList }: { details: Hawk, clearData: Function, reloadHawkList: Function }) {
    const [open, setOpen] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        if ('id' in details) {
            setOpen(true)
        }
    }, [details]);

    async function deleteHawk(id: number) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (response.status === 204) {
            reloadHawkList();
            close()
        } else {
            //TODO use alert modal
            alert('error');
        }
    }

    function close() {
        setOpen(false)
        clearData()
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={close}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex w-full sm:w-2/5 pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="pointer-events-auto relative w-full">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-500"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-500"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                        <button
                                            type="button"
                                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                            onClick={close}
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="h-full overflow-y-auto bg-white p-8 ">
                                    <div className="space-y-6 pb-16 ">
                                        <div className="block w-full overflow-hidden rounded-lg">
                                            <img
                                                src={details.pictureUrl}
                                                alt=""
                                                className="object-contain h-96 w-full"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Information</h3>
                                            <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                                                <div className="flex justify-between py-3 text-sm font-medium">
                                                    <dt className="text-gray-500">Name</dt>
                                                    <dd className="text-gray-900">{details.name}</dd>
                                                </div>
                                                <div className="flex justify-between py-3 text-sm font-medium">
                                                    <dt className="text-gray-500">Size</dt>
                                                    <dd className="text-gray-900 capitalize">{details.size?.toLowerCase()}</dd>
                                                </div>
                                                <div className="flex justify-between py-3 text-sm font-medium">
                                                    <dt className="text-gray-500">Gender</dt>
                                                    <dd className="text-gray-900 capitalize">{details.gender?.toLowerCase()}</dd>
                                                </div>
                                                <div className="flex justify-between py-3 text-sm font-medium">
                                                    <dt className="text-gray-500">Length</dt>
                                                    <dd className="text-gray-900">From {details.lengthBegin} To {details.lengthEnd} cm</dd>
                                                </div>
                                                <div className="flex justify-between py-3 text-sm font-medium">
                                                    <dt className="text-gray-500">Wingspan</dt>
                                                    <dd className="text-gray-900">From {details.wingspanBegin} To {details.wingspanEnd} cm</dd>
                                                </div>
                                                <div className="flex justify-between py-3 text-sm font-medium">
                                                    <dt className="text-gray-500">Weight</dt>
                                                    <dd className="text-gray-900">From {details.weightBegin} To {details.weightEnd} grams</dd>
                                                </div>
                                            </dl>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Color Description</h3>
                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="text-sm italic text-gray-500">{details.colorDescription}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Behavior Description</h3>
                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="text-sm italic text-gray-500">{details.behaviorDescription}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Habitat Description</h3>
                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="text-sm italic text-gray-500">{details.habitatDescription}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Picture Url</h3>
                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="text-sm italic text-gray-500 break-all">{details.pictureUrl}</p>
                                            </div>
                                        </div>

                                        <hr className="space-y-8 divide-y divide-gray-200 pt-5"/>
                                        <div>
                                            <AlertModal isOpen={showConfirmDelete} onCallback={ () => deleteHawk(details.id) } onClose={() => setShowConfirmDelete(false)} title="Are you sure?" description="Your hawk will be permanently removed from our servers forever. This action cannot be undone." />
                                            <div className="flex justify-end ">
                                                <button
                                                    type="button"
                                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hawk-500"
                                                    onClick={close}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-hawk-600 hover:bg-hawk-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hawk-500"
                                                    onClick={() => setShowConfirmDelete(true)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
