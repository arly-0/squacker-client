import {useGetAllUserSessionsQuery} from "../../lib/store/sessions/session-slice-api";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../lib/store/auth/auth-slice";
import {formatDate, formatBool} from "../../lib/helpers/helpers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";

export default function Sessions() {
    const user = useSelector(selectCurrentUser)
    const {data, error, isLoading} = useGetAllUserSessionsQuery(user.id)

    return (
        <div>
            <table className='table table-bordered table-striped table-responsive-sm'>
            <thead>
            <tr className='table'>
                <th>Date</th>
                <th>Laps</th>
                <th>Average Lap</th>
                <th>Best Lap</th>
                <th>Track Length</th>
                <th>Wet</th>
                <th>Note</th>
                <th>Actions</th>
            </tr>
            </thead>
                <tbody>
                {isLoading === false && data.map(session => (
                    <tr key={session.id}>
                        <td>{formatDate(session.date)}</td>
                        <td>{session.laps?.length}</td>
                        <td>{session.avg_lap}</td>
                        <td>{session.best_lap}</td>
                        <td>{session.track_length}</td>
                        <td>{formatBool(session.wet)}</td>
                        <td>{session.note}</td>
                        <td>
                            <button className='btn btn-outline-primary'>
                                <FontAwesomeIcon icon={faEye}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}