"use client"
import { closeConfirmModal, confirmModalAtom } from '@/atom/confirmationAtom'
import { useAtom, useSetAtom } from 'jotai'
import { AlertTriangle } from 'lucide-react';
import React from 'react'

const ConfirmModal = () => {
    const [confirmModals] = useAtom(confirmModalAtom);
    const closeModal = useSetAtom(closeConfirmModal);

    // const data = {
    //     title: "unsave The",
    //     message: "mnkj njknj mnjdndmnjlndndlkn dkjdlk kdlkd k"
    // }
    return (
        <>
            {
                confirmModals.map((data,index) => (
                    <div key={index} className="fixed inset-0 z-51 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => closeModal(false)}
                        />
                        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 mx-auto mb-4">
                                <AlertTriangle className="w-6 h-6 text-rose-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">{data.title}</h2>
                            <p className="text-sm text-gray-800 text-center leading-relaxed mb-6">{data.message}</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => closeModal(false)}
                                    className="flex-1 button"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => closeModal(true)}
                                    className="flex-1 button bg-rose-500! text-white! hover:bg-rose-600! button"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ConfirmModal