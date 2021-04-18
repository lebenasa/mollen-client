import React from 'react';
import '../../foundation.sass';

// Standard page layouts.
export enum Layout {
    // Default layout. On desktop and landscape tablet shows a side column for additional landmarks. Behaves like SingleColumn on mobile.
    // Use `layoutHint` property to select elements for side column.
    TwoColumns,
    // Single column on screen resolutions with margins.
    SingleColumn,
    // Allow components to fill the entire screen width.
    Full,
}

function layoutClassName(layout: Layout) {
    switch (layout) {
        case Layout.SingleColumn:
            return 'layout--single-column';
        case Layout.Full:
            return 'layout--full';
        case Layout.TwoColumns:
        default:
            return 'layout--two-columns';
    }
}

export interface Options {
    layout: Layout,
}

const defaultOptions: Options = {
    layout: Layout.TwoColumns,
}

export default function createPage<T>(Main: React.ComponentType<T>, options?: Options) {
    const _options = { ...defaultOptions, ...options };
    return (props: React.ComponentProps<typeof Main>) => (
        <>
            <header>
            </header>
            <main className={layoutClassName(_options.layout)}>
                <Main {...props} />
            </main>
            <footer>
            </footer>
        </>
    );
}
