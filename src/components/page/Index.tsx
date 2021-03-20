export interface Props {
    isLoggedIn: boolean,
    latestAppName: string,
    onCreateApp: () => Promise<void>,
}

export default function (props: Props) {
    const {
        isLoggedIn
    } = props;
    return (
        <>
            <h1>
                Web Apps Made Simple
            </h1>
            <p>
                Start creating an app with three simple steps:
                <ol>
                    Create a new app.
                    <button onClick={props.onCreateApp}>Create App</button>
                </ol>
                <ol>
                    Get a preview link.
                    {isLoggedIn && <div>
                        <p>
                            Preview of your latest app: <button>{props.latestAppName}</button>
                        </p>
                    </div>
                    }
                </ol>
                <ol>
                    Launch your app!
                    {isLoggedIn && <div>
                        <p>
                            Launch your latest app: <button>{props.latestAppName}</button>
                        </p>
                    </div>
                    }
                </ol>
            </p>
        </>
    );
}