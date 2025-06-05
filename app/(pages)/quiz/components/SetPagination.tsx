import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";

export default function SetPagination({ setIndex, retryMode, totalSets, handleGoToSet }: any) {
    // 최대 6개만 노출
    const maxVisible = 6;
    let start = Math.max(0, setIndex - Math.floor(maxVisible / 2));
    let end = start + maxVisible;
    if (end > totalSets) {
        end = totalSets;
        start = Math.max(0, end - maxVisible);
    }
    const pageNumbers = Array.from({ length: end - start }, (_, i) => start + i);

    return (
        <Pagination>
            <PaginationContent>
                {setIndex > 0 && !retryMode && (
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handleGoToSet(setIndex - 1)} />
                    </PaginationItem>
                )}
                {start > 0 && (
                    <PaginationItem>
                        <PaginationLink onClick={() => handleGoToSet(0)} href="#">1</PaginationLink>
                    </PaginationItem>
                )}
                {start > 1 && (
                    <PaginationItem>
                        <span className="px-2">...</span>
                    </PaginationItem>
                )}
                {pageNumbers.map((i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={setIndex === i && !retryMode}
                            onClick={() => handleGoToSet(i)}
                            href="#"
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {end < totalSets - 1 && (
                    <PaginationItem>
                        <span className="px-2">...</span>
                    </PaginationItem>
                )}
                {end < totalSets && (
                    <PaginationItem>
                        <PaginationLink onClick={() => handleGoToSet(totalSets - 1)} href="#">{totalSets}</PaginationLink>
                    </PaginationItem>
                )}
                {setIndex < totalSets - 1 && !retryMode && (
                    <PaginationItem>
                        <PaginationNext onClick={() => handleGoToSet(setIndex + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
} 