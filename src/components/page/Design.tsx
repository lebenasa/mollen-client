import Grid from "../layout/Grid";

export interface DesignProps {
}

export default function (props: DesignProps) {
    return (
        <>
            <h1>
                Style Guideline
            </h1>
            <h2>
                Typography
            </h2>
            <Grid columns={4}>
                <Grid.Item>
                    <h1 style={{ margin: 0 }}>Header 1</h1>
                </Grid.Item>
                    <Grid.Item columnSpan={3}>
                        <p>Header 1</p>
                </Grid.Item>
                <Grid.Item>
                    <h2 style={{ margin: 0 }}>Header 2</h2>
                </Grid.Item>
                <Grid.Item columnSpan={3}>
                    <p>Header 2</p>
                </Grid.Item>
                <Grid.Item>
                    <p>Normal text</p>
                </Grid.Item>
                <Grid.Item columnSpan={3}>
                    <p>Normal text</p>
                </Grid.Item>
                <Grid.Item>
                    <a href="#">Link</a>
                </Grid.Item>
                <Grid.Item columnSpan={3}>
                    <p>Link</p>
                </Grid.Item>
                <Grid.Item>
                    <code>Code block</code>
                </Grid.Item>
                <Grid.Item columnSpan={3}>
                    <p>Code block</p>
                </Grid.Item>
            </Grid>
            <h2>
                Colour Palette
            </h2>
            <h2>
                Controls
            </h2>
            <h2>
                Line Graph
            </h2>
            <h2>
                Bar Graph
            </h2>
        </>
    );
}