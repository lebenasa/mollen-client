import React from 'react';
import '../../foundation.sass';

export default function createPage<T>(Main: React.ComponentType<T>) {
    return (props: React.ComponentProps<typeof Main>) => (
        <>
            <header>
            </header>
            <main>
                <Main {...props} />
            </main>
            <footer>
            </footer>
        </>
    );
}
