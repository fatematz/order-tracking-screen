import { Phone, MessageCircle, Mail, Clock, ExternalLink } from "lucide-react";
import BottomSheet from "@/components/ui/BottomSheet";
import Button from "@/components/ui/Button";

/**
 * ContactSupportSheet — provides chat, call, and email support options.
 *
 * @param {boolean} open — controlled open/close
 * @param {function} onClose — close callback
 * @param {function} onStartChat — open chat
 * @param {function} onCall — initiate call
 * @param {function} onEmail — open email client
 */
export default function ContactSupportSheet({ open, onClose, onStartChat, onCall, onEmail }) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Contact Support">
      <div className="space-y-4">
        {/* Intro */}
        <p className="text-sm text-gray-600">
          Need help with your order? Choose a support option below.
        </p>

        {/* Support hours */}
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm text-blue-800">
          <Clock className="h-4 w-4 shrink-0" />
          <span>Support available: 8 AM – 10 PM (every day)</span>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {/* Chat */}
          <button
            onClick={onStartChat}
            className="flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 text-left hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Live Chat</p>
              <p className="text-xs text-gray-500">Avg. response: 2 minutes</p>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </button>

          {/* Call */}
          <button
            onClick={onCall}
            className="flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 text-left hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Call Us</p>
              <p className="text-xs text-gray-500">+880 1XXX-XXXXXX</p>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </button>

          {/* Email */}
          <button
            onClick={onEmail}
            className="flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 text-left hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Email Support</p>
              <p className="text-xs text-gray-500">support@shop.com</p>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* Cancel button */}
        <Button variant="secondary" onClick={onClose} className="w-full">
          Cancel
        </Button>
      </div>
    </BottomSheet>
  );
}
