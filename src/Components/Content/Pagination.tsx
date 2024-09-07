import ReactPaginate from "react-paginate"
import infoStore from "../../store/infoId";

const Pagination = () => {
    const{setPage} = infoStore()
    const handleClick = (info: { selected: number }) => {
        setPage(info.selected+1)
    }
    return (
        <ReactPaginate
            pageCount={500}
            nextLabel={">>"}
            previousLabel={"<<"}
            className="paginate"
            activeLinkClassName="paginate_active"
            pageLinkClassName="paginate_link"
            previousClassName="paginate_prev"
            nextClassName="paginate_next"
            breakClassName="paginate_break"
            marginPagesDisplayed={1}
            onPageChange={handleClick}
        />
    )
}

export default Pagination