
import TransactionChart from './transaction_chart/TransactionChart';
import DashboardGrid from './dashboard_grid/DashboardGrid';
function HomePageDash (){
    return (
        <div className= "flex  flex-col gap-4 w-full">
            <DashboardGrid/>
            <TransactionChart/>
        </div>
    )
}


export default HomePageDash;