import { Phone, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * ActionBar — sticky bottom action bar.
 * Always visible: "Contact Support" primary button + optional chat button.
 *
 * @param {function} onContactSupport — opens ContactSupportSheet
 * @param {function} onChat — opens chat (optional)
 * @param {string} className — extra classes
 */
export default function ActionBar({ onContactSupport, onChat, className }) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-40 border-t border-gray-100 bg-white/95 px-4 pt-3 backdrop-blur-sm",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className
      )}
    >
      <div className="mx-auto flex max-w-107.5 gap-3">
        <Button variant="primary" onClick={onContactSupport} className="flex-1">
          <Phone className="h-4 w-4" />
          Contact Support
        </Button>
        {onChat && (
          <Button variant="secondary" onClick={onChat} className="px-4" aria-label="Live chat">
            <MessageCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
