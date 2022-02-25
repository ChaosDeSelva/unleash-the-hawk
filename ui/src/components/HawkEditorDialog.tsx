import React, {Fragment, useEffect, useState} from "react";
import { Hawk } from "../interfaces/Hawk";
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Gender } from "../constants/Gender";
import { Size } from "../constants/Size";
import { API_URL } from "../api/Url";
import { HawkEditor } from "../interfaces/HawkEditor";

export default function HawkEditorDialog({ details, onAddHawk, onCloseAddHawk }: { details: HawkEditor, onAddHawk: Function, onCloseAddHawk: Function }) {
    const DEFAULT_STATE = {
        behaviorDescription: '',
        colorDescription: '',
        gender: Gender.MALE,
        habitatDescription: '',
        id: -1,
        lengthBegin: 0,
        lengthEnd: 0,
        name: '',
        pictureUrl: '',
        size: Size.SMALL,
        weightBegin: 0,
        weightEnd: 0,
        wingspanBegin: 0,
        wingspanEnd: 0
    };

    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [hawk, setHawk] = useState<Hawk>(DEFAULT_STATE);

    useEffect(() => {
        setOpen(details.isOpen);
        if (details.hawk !== null) {
            setHawk(details.hawk);
            setIsEditing(true);
        }
    }, [details]);

    function handleChange(event: { target: { id: string; value: string | number; }; }) {
        setHawk({ ...hawk, [event.target.id]: event.target.value } as Pick<Hawk, keyof Hawk>)
    }

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        const response = await fetch(`${API_URL}${ isEditing ? `/${hawk.id}` : '' }`, {
            method: isEditing ? 'PUT' : 'POST',
            body: JSON.stringify(hawk),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        if (response.status === 200) {
            onAddHawk();
            setHawk(DEFAULT_STATE);
            close();
        } else {
            alert(data.error);
        }
    }

    function close() {
        setOpen(false);
        setIsEditing(false);
        onCloseAddHawk();
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
                                <div className="h-full overflow-y-auto bg-white p-8">
                                    <div className="space-y-6 pb-16">
                                        <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                                            <div className="space-y-8 divide-y divide-gray-200">
                                                <div>
                                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{ isEditing ? 'Edit' : 'Add'} Hawk</h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        He who controls the hawk, controls the sky.
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                        <div className="sm:col-span-6">
                                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                                Name
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    autoFocus
                                                                    required
                                                                    data-testid="nameInput"
                                                                    type="text"
                                                                    name="name"
                                                                    id="name"
                                                                    className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                    value={hawk.name}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                                                                Size
                                                            </label>
                                                            <div className="mt-1">
                                                                <select
                                                                    id="size"
                                                                    name="size"
                                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-hawk-500 focus:border-hawk-500 sm:text-sm rounded-md"
                                                                    value={hawk.size}
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value={Size.SMALL}>Small</option>
                                                                    <option value={Size.MEDIUM}>Medium</option>
                                                                    <option value={Size.LARGE}>Large</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                                                Gender
                                                            </label>
                                                            <div className="mt-1">
                                                                <select
                                                                    id="gender"
                                                                    name="gender"
                                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-hawk-500 focus:border-hawk-500 sm:text-sm rounded-md"
                                                                    value={hawk.gender}
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value={Gender.MALE}>Male</option>
                                                                    <option value={Gender.FEMALE}>Female</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="lengthBegin" className="block text-sm font-medium text-gray-700">
                                                                Length From
                                                            </label>
                                                            <div className="mt-1 relative">
                                                                <input
                                                                    required
                                                                    id="lengthBegin"
                                                                    name="lengthBegin"
                                                                    type="number"
                                                                    className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                    value={hawk.lengthBegin}
                                                                    onChange={handleChange}
                                                                />

                                                                <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
                                                                  <span className="text-gray-500 sm:text-sm">
                                                                    CM
                                                                  </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="lengthEnd" className="block text-sm font-medium text-gray-700">
                                                                Length To
                                                            </label>
                                                            <div className="mt-1 relative">
                                                                <input
                                                                    required
                                                                    id="lengthEnd"
                                                                    name="lengthEnd"
                                                                    type="number"
                                                                    className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                    value={hawk.lengthEnd}
                                                                    onChange={handleChange}
                                                                />

                                                                <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
                                                                  <span className="text-gray-500 sm:text-sm">
                                                                    CM
                                                                  </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="wingspanBegin" className="block text-sm font-medium text-gray-700">
                                                                Wingspan From
                                                            </label>
                                                            <div className="mt-1 relative">
                                                                <input
                                                                    required
                                                                    id="wingspanBegin"
                                                                    name="wingspanBegin"
                                                                    type="number"
                                                                    className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                    value={hawk.wingspanBegin}
                                                                    onChange={handleChange}
                                                                />

                                                                <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
                                                                  <span className="text-gray-500 sm:text-sm">
                                                                    CM
                                                                  </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="wingspanEnd" className="block text-sm font-medium text-gray-700">
                                                                Wingspan To
                                                            </label>
                                                            <div className="mt-1 relative">
                                                                <input
                                                                    required
                                                                    id="wingspanEnd"
                                                                    name="wingspanEnd"
                                                                    type="number"
                                                                    className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                    value={hawk.wingspanEnd}
                                                                    onChange={handleChange}
                                                                />

                                                                <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
                                                                  <span className="text-gray-500 sm:text-sm">
                                                                    CM
                                                                  </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="weightBegin" className="block text-sm font-medium text-gray-700">
                                                                Weight From
                                                            </label>
                                                            <div className="mt-1 relative">
                                                                <input
                                                                    required
                                                                    id="weightBegin"
                                                                    name="weightBegin"
                                                                    type="number"
                                                                    className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                    value={hawk.weightBegin}
                                                                    onChange={handleChange}
                                                                />

                                                                <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
                                                                  <span className="text-gray-500 sm:text-sm">
                                                                    Grams
                                                                  </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-3">
                                                            <label htmlFor="weightEnd" className="block text-sm font-medium text-gray-700">
                                                                Weight To
                                                            </label>
                                                            <div className="mt-1 relative">
                                                                <input
                                                                    required
                                                                    id="weightEnd"
                                                                    name="weightEnd"
                                                                    type="number"
                                                                    className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                    value={hawk.weightEnd}
                                                                    onChange={handleChange}
                                                                />

                                                                <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
                                                                  <span className="text-gray-500 sm:text-sm">
                                                                    Grams
                                                                  </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-6">
                                                            <label htmlFor="colorDescription" className="block text-sm font-medium text-gray-700">
                                                                Color Description
                                                            </label>
                                                            <div className="mt-1">
                                                            <textarea
                                                                required
                                                                rows={4}
                                                                name="colorDescription"
                                                                id="colorDescription"
                                                                className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                value={hawk.colorDescription}
                                                                onChange={handleChange}
                                                            />
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-6">
                                                            <label htmlFor="behaviorDescription" className="block text-sm font-medium text-gray-700">
                                                                Behavior Description
                                                            </label>
                                                            <div className="mt-1">
                                                            <textarea
                                                                required
                                                                rows={4}
                                                                name="behaviorDescription"
                                                                id="behaviorDescription"
                                                                className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                value={hawk.behaviorDescription}
                                                                onChange={handleChange}
                                                            />
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-6">
                                                            <label htmlFor="habitatDescription" className="block text-sm font-medium text-gray-700">
                                                                Habitat Description
                                                            </label>
                                                            <div className="mt-1">
                                                            <textarea
                                                                required
                                                                rows={4}
                                                                name="habitatDescription"
                                                                id="habitatDescription"
                                                                className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                value={hawk.habitatDescription}
                                                                onChange={handleChange}
                                                            />
                                                            </div>
                                                        </div>

                                                        <div className="sm:col-span-6">
                                                            <label htmlFor="pictureUrl" className="block text-sm font-medium text-gray-700">
                                                                Picture Url
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    name="pictureUrl"
                                                                    id="pictureUrl"
                                                                    className="shadow-sm focus:ring-hawk-500 focus:border-hawk-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                                    value={hawk.pictureUrl}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pt-6">
                                                        {hawk.pictureUrl &&
                                                        <img
                                                            src={hawk.pictureUrl}
                                                            alt=""
                                                            className="object-contain h-96 w-full"
                                                        />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-5 ">
                                                <div className="flex justify-end">
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
                                                    >
                                                        { isEditing ? 'Update' : 'Save'}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
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
