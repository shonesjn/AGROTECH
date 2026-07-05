import CountUp from "react-countup";

export default function Stats() {
  return (
    <div className="flex justify-center gap-24 mt-24">

      <div>

        <h2 className="text-5xl font-bold text-green-400">

          <CountUp end={120} duration={3} />+

        </h2>

        <p>Sensors</p>

      </div>

      <div>

        <h2 className="text-5xl font-bold text-green-400">

          <CountUp end={250} duration={3} />+

        </h2>

        <p>Alerts</p>

      </div>

      <div>

        <h2 className="text-5xl font-bold text-green-400">

          <CountUp end={98} duration={3} />%

        </h2>

        <p>Accuracy</p>

      </div>

    </div>
  );
}