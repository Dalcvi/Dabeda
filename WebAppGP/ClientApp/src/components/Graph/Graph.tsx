import { Line } from "react-chartjs-2";

export const Graph = (props: any) => {
  const data: Array<Object> = [];
  console.log(props.completedExercises);
  props.completedExercises.map(
    (exercise: {
      id: number;
      exerciseId: number;
      name: string;
      weight: number;
      reps: Array<Number>;
      date: string;
    }) => {
      data.push({ x: exercise["date"], y: exercise["weight"] });
    }
  );
  return (
    <Line
      type={"line"}
      data={{
        datasets: [
          {
            label: "Bench Press",
            data: data,
            borderColor: "rgba(75, 123, 192, 1)",
            pointBorderColor: "rgba(200, 123, 255, 1)",
            borderWidth: 2,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        animation: {
          duration: 0,
        },
      }}
    />
  );
};
