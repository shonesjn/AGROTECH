import {
  ShieldCheck,
  Lock,
  Database,
  Network,
  CheckCircle2,
  ArrowDown,
} from "lucide-react";

export default function Blockchain() {
  return (
    <div className="space-y-8 text-white">

      {/* Header */}

      <div>

        <h1 className="text-5xl font-bold">
          🔗 Blockchain Technology
        </h1>

        <p className="text-gray-400 mt-4 max-w-4xl leading-8">
          Blockchain provides a secure, transparent and decentralized
          platform for storing agricultural data. It protects farm
          records from tampering while ensuring trust between farmers,
          buyers and organizations.
        </p>

      </div>

      {/* Introduction */}

      <div className="bg-[#111827] rounded-3xl border border-white/10 p-8">

        <div className="flex items-center gap-4 mb-6">

          <ShieldCheck
            size={34}
            className="text-green-400"
          />

          <h2 className="text-3xl font-bold">
            What is Blockchain?
          </h2>

        </div>

        <p className="text-gray-300 leading-8">

          Blockchain is a decentralized digital ledger that stores
          information securely in interconnected blocks. Every block
          contains verified data and is linked to the previous block
          using cryptographic hashing, making the stored information
          immutable and highly secure.

          <br /><br />

          Unlike traditional databases, blockchain prevents unauthorized
          modifications, ensuring transparency, authenticity and trust
          throughout the agricultural ecosystem.

        </p>

      </div>

      {/* Features */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-[#111827] rounded-3xl border border-white/10 p-6">

          <Lock className="text-green-400 mb-5" size={34} />

          <h3 className="text-xl font-semibold">

            Secure

          </h3>

          <p className="text-gray-400 mt-3">

            Protects agricultural records from unauthorized access.

          </p>

        </div>

        <div className="bg-[#111827] rounded-3xl border border-white/10 p-6">

          <Database className="text-blue-400 mb-5" size={34} />

          <h3 className="text-xl font-semibold">

            Immutable

          </h3>

          <p className="text-gray-400 mt-3">

            Once data is stored, it cannot be altered or deleted.

          </p>

        </div>

        <div className="bg-[#111827] rounded-3xl border border-white/10 p-6">

          <Network className="text-purple-400 mb-5" size={34} />

          <h3 className="text-xl font-semibold">

            Transparent

          </h3>

          <p className="text-gray-400 mt-3">

            Every authorized participant can verify the stored records.

          </p>

        </div>

        <div className="bg-[#111827] rounded-3xl border border-white/10 p-6">

          <CheckCircle2 className="text-yellow-400 mb-5" size={34} />

          <h3 className="text-xl font-semibold">

            Trusted

          </h3>

          <p className="text-gray-400 mt-3">

            Builds confidence among farmers, buyers and suppliers.

          </p>

        </div>

      </div>

      {/* How It Works */}

      <div className="bg-[#111827] rounded-3xl border border-white/10 p-8">

        <h2 className="text-3xl font-bold mb-8">

          How Blockchain Works in AgroTech

        </h2>

        <div className="flex flex-col items-center text-center space-y-5">

          <div className="bg-[#08111F] rounded-2xl px-8 py-4 border border-white/10">
            ESP32 Sensors
          </div>

          <ArrowDown className="text-green-400" />

          <div className="bg-[#08111F] rounded-2xl px-8 py-4 border border-white/10">
            Sensor Data Collection
          </div>

          <ArrowDown className="text-green-400" />

          <div className="bg-[#08111F] rounded-2xl px-8 py-4 border border-white/10">
            Backend Processing
          </div>

          <ArrowDown className="text-green-400" />

          <div className="bg-[#08111F] rounded-2xl px-8 py-4 border border-white/10">
            Blockchain Verification
          </div>

          <ArrowDown className="text-green-400" />

          <div className="bg-[#08111F] rounded-2xl px-8 py-4 border border-white/10">
            Secure Data Storage
          </div>

          <ArrowDown className="text-green-400" />

          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl px-8 py-4">

            Dashboard & AI Assistant

          </div>

        </div>

      </div>

      {/* Future Scope */}

      <div className="bg-[#111827] rounded-3xl border border-white/10 p-8">

        <h2 className="text-3xl font-bold mb-6">

          Future Scope

        </h2>

        <ul className="space-y-4 text-gray-300">

          <li>✅ Smart Contract Integration</li>

          <li>✅ Agricultural Supply Chain Tracking</li>

          <li>✅ Crop Traceability</li>

          <li>✅ Secure Farmer Identity Management</li>

          <li>✅ Transparent Marketplace Transactions</li>

          <li>✅ AI & Blockchain Integrated Decision Making</li>

        </ul>

      </div>

    </div>
  );
}