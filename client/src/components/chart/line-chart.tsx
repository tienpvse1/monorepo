import { Line } from '@ant-design/plots';
import { controllers } from '../../constance/controllers';
import { data } from '../../interfaces/statistic/line-chart';
const { X_FIELD, Y_FIELD } = controllers;
export const LineChart = () => {
    const config: any = {
        data,
        xField: X_FIELD,
        yField: Y_FIELD,
        seriesField: 'name',
        yAxis: {
            label: {
                formatter: (v: number) => `${(v / 10e8).toFixed(1)}K $`,
            },
        },
        legend: {
            position: 'top',
        },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 2000,
            },
        },
        color: ['#5E35B1', '#FFEE58', '#DD2C00']

    };
    return (
        <Line height={300} width={750} {...config} />
    )
}
