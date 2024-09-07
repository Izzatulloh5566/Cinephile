import ContentLoader from "react-content-loader"

const Skleton = () => {
    return (
        <ContentLoader
            speed={1}
            width={310}
            height={460}
            backgroundColor="gray"
            foregroundColor="#fff"
            
        >
            <rect x="0" y="0"  width="310" height="460" rx="10" ry="10" />
        </ContentLoader>
    )
}

export default Skleton