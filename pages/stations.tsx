import { BaseLayout, Navbar } from "../components";
import { useAuth } from '../services/AuthProvider';

export default function Stations() {
    function handleError(event: React.SyntheticEvent<HTMLImageElement>) {
        // Replace the original image with a placeholder image
        const imgElement = event.target as HTMLImageElement;
        imgElement.src = 'https://media.tenor.com/udq1uD9WHSQAAAAM/oops.gif';
        // imgElement.src = 'vercel.svg';
      }

    const { user } = useAuth()
    return (
        <>
        <Navbar main={false} dashboard={false} datamanager={false} stations={true} />
        <BaseLayout>
            <h1>Hello {user.name}</h1>
            <p>{user.preferred_username}</p>
            <img src={"https://epi.pea.co.th/Images/"+user.preferred_username+".JPG"} onError={handleError} ></img>
       </BaseLayout>
        </>
        
    )
}

Stations.requireAuth = true