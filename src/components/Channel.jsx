import { useParams } from "react-router-dom";

export default function Channel() {
  const channelId = useParams();
  console.log(channelId);
  return <div>channel {channelId.channelId}</div>;
}
