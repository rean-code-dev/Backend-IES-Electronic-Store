import {FcBullish} from 'react-icons/fc'
function Sidebar(){
    return (
        <div className="bg-neutral-900 w-60 p3 flex flex-col text-white">
            <div className="flex items-center gap-2 px-1 pv-3">
                <FcBullish fontSize={24}/>
                <span className="text-neutral-100 text-lg">IES Store</span>

            </div>
            <div className="flex-1"></div>
            <div>Bottom</div>
        </div>
    )

}
export default Sidebar