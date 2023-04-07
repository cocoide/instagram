import React from 'react';
import { clsx } from '../../../utils/clsx';


type PaginateButtonProps = {
    page: number;
    lastPage: number;
    setIsLoading: (isLoading: boolean) => void
    setPage: (page: number) => void;
};

const PaginateButton: React.FC<PaginateButtonProps> = ({
    page,
    lastPage,
    setIsLoading,
    setPage,
}) => {
    const pagenation_section = 'flex justify-center items-center my-5';
    const move_button =
        'rounded-md w-8 h-8 text-lg font-bold text-gray-800 mx-1  focus:outline-none';

    return (
        <div className={clsx(pagenation_section)}>
            <button
                onClick={() => {
                    setPage(page - 1), setIsLoading(true);
                }}
                disabled={page == 1 && true}
                className={clsx(move_button, page == 1 ? "" : "hover:bg-gray-200")}
            >
                ◁
            </button>
            <button
                onClick={() => {
                    setPage(page + 1), setIsLoading(true);
                }}
                disabled={page == lastPage && true}
                className={clsx(move_button, page == lastPage ? "" : "hover:bg-gray-200")}
            >
                ▷
            </button>
        </div>
    );
};

export default PaginateButton;