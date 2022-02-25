import React, {useCallback, useEffect, useState} from "react";
import { Hawk } from "../interfaces/Hawk";
import HawkEditorDialog from "./HawkEditorDialog";
import HawkDetailsDialog from "./HawkDetailsDialog";
import FilterHawksForm from "./FilterHawksForm";
import { ArrowCircleDownIcon, ArrowCircleUpIcon, PlusIcon } from "@heroicons/react/solid";
import { SortDirection } from "../constants/SortDirection";
import { API_URL } from "../api/Url";
import { HawkEditor } from "../interfaces/HawkEditor";

export default function HawkList() {
    const HEADERS = ['Name', 'Size', 'Gender'];

    const [editorDetails, setEditorDetails] = useState<HawkEditor>({
        isOpen: false,
        hawk: null
    });
    const [hawks, setHawks] = useState([]);
    const [details, setDetails] = useState<Hawk>({} as Hawk);
    const [params, setParams] = useState<Record<string, string>>({
        filter: '',
        sortDir: 'asc',
        sortField: 'name',
    });

    useEffect(() => {
        fetchHawks();
    }, [params]);

    const fetchHawks = useCallback(async () => {
        const url = new URL(`${API_URL}/list`);
        for (let i in params) {
            url.searchParams.append(i, params[i]);
        }

        const response = await fetch(url.toString());
        const data = await response.json();

        if (response.status === 200) {
            setHawks(data.hawks)
        } else {
            //TODO use alert modal
            alert('error')
        }
    }, [params]);


    function filterHawks(value: string) {
        setParams(params => ({ ...params, filter: value }));
    }

    function sortByHeader(sortField: string) {
        let sortDir = SortDirection.ASC;
        if (sortField === params.sortField) {
            if (params.sortDir === SortDirection.ASC) {
                sortDir = SortDirection.DESC;
            }
        }

        setParams(params => ({ ...params, sortDir, sortField }));
    }

    return (
        <div>
            <HawkEditorDialog details={editorDetails} onAddHawk={fetchHawks} onCloseAddHawk={() => setEditorDetails({isOpen: false, hawk: null })} />
            <HawkDetailsDialog details={details} clearData={() => setDetails({} as Hawk)} reloadHawkList={fetchHawks}/>
            <div className="flex-shrink sm:flex justify-between pb-6">
                <FilterHawksForm onFilterHawks={filterHawks} />
                <div className="pt-6 sm:pt-0">
                    <button
                        onClick={() => setEditorDetails({isOpen: true, hawk: null })}
                        type="button"
                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hawk-500"
                    >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Add Hawk</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    {HEADERS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            onClick={() => sortByHeader(header.toLowerCase())}
                                        >
                                            <div className="inline-flex justify-center">
                                                <span>{ header }</span>
                                                {params.sortField === header.toLowerCase() && params.sortDir === SortDirection.ASC &&
                                                    <ArrowCircleUpIcon className="h-4 w-4 text-gray-400" aria-hidden="true"/>
                                                }
                                                {params.sortField === header.toLowerCase() && params.sortDir === SortDirection.DESC &&
                                                <ArrowCircleDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true"/>
                                                }
                                            </div>
                                        </th>
                                    ))}
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                    {hawks.map((hawk: Hawk, idx) => (
                                        <tr key={hawk.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hawk.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{hawk.size?.toLowerCase()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{hawk.gender?.toLowerCase()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => setEditorDetails({isOpen: true, hawk })} className="text-hawk-600 hover:text-hawk-900 mr-2 cursor-pointer">
                                                    Edit
                                                </button>

                                                <button onClick={() => setDetails(hawk)} className="text-hawk-600 hover:text-hawk-900 ml-2 cursor-pointer">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {!hawks.length &&
                                        <tr>
                                            <td colSpan={4} className="p-6">
                                                No Data Found.
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
