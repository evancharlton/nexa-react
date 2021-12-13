import { useCallback, useState } from "react";
import Axios from "axios";

function App() {
  const [ip, setIp] = useState("192.168.11.146");
  const [nodes, setNodes] = useState<object | null>(null);
  const [error, setError] = useState<Error>();

  const listNodes = useCallback(() => {
    Axios.get(`http://${ip}/v1/nodes`, {
      headers: {
        Authorization: `Digest username="nexa", realm="NexaRealm", nonce="SdtVF0h3VliycaRBQljGSsJ1Ie8mWNIW", uri="/v1/nodes", algorithm=MD5, response="efbbb0e8f48b1e4d8e1f47735d819cfe", opaque="asdasdh123u8123u1283u213213", qop=auth, nc=00000016, cnonce="2626b0fda5db2151"`,
      },
    })
      .then((nodes) => {
        console.log(nodes);
        setNodes(nodes.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, [ip]);

  return (
    <>
      <input
        placeholder="Bridge X IP / domain"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
      <button onClick={() => listNodes()}>List nodes</button>
      <hr />
      {nodes && (
        <>
          <h1>Nodes</h1>
          <pre>{JSON.stringify(nodes, null, 2)}</pre>
        </>
      )}
      {error && (
        <>
          <h1>{error.message}</h1>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}

export default App;
