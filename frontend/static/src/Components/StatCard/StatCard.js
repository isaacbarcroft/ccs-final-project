import { IconButton } from "@mui/material";
import NoteIcon from '@mui/icons-material/Note';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';


function StatCard(props) {
    return (
        <>
            <div style={{ position: 'relative', marginRight: '100px' }} className="header-body">
                <div className="row" style={{ justifyContent: 'right' }}>
                    <div style={{ marginRight: '150px' }} className="col-xl-3 col-lg-6">
                        <div style={{ marginTop: '10px' }} className="card card-stats mb-4 mb-xl-0">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="card-title text-uppercase text-muted mb-0">PagesRead</h5>
                                        <span className="h2 font-weight-bold mb-0">{parseInt(props.totalpages)}</span>
                                    </div>
                                    <div className="col-auto">
                                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                            <i className="fas fa-chart-bar"><NoteIcon /></i>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-3 mb-0 text-muted text-sm">
                                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                    <span className="text-nowrap">Since last month</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                        <div style={{ marginTop: '10px' }} className="card card-stats mb-4 mb-xl-0">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="card-title text-uppercase text-muted mb-0">Books Read</h5>
                                        <span className="h2 font-weight-bold mb-0">{props.total}</span>
                                    </div>
                                    <div className="col-auto">
                                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                            <i className="fas"><ImportContactsIcon /></i>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-3 mb-0 text-muted text-sm">
                                    <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 3.48%</span>
                                    <span className="text-nowrap">Since last week</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatCard;