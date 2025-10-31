import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import {
  Trash2,
  User,
  Mail,
  Building2,
  MessageSquare,
  Calendar,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { UnreadContext } from "../../components/AdminLayout";

export function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUnreadCount } = useContext(UnreadContext);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/msg/contacts");
        const data = Array.isArray(res.data) ? res.data : [];
        setMessages(data);

        // initialize unread count
        const unread = data.filter((msg) => !msg.read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [setUnreadCount]);

  // Delete message
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/msg/contacts/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      setUnreadCount((prev) => Math.max(prev - 1, 0));
      toast.success("Message deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message");
    }
  };

  // Mark as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/api/msg/contact/${id}/read`);

      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: true } : msg))
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("Failed to mark message as read:", err);
      toast.error("Failed to mark message as read");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-slate-900 dark:text-white mb-2">
          Contact Messages
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          View and manage messages submitted via your Contact Us form.
        </p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="text-green-500" /> Messages
          </CardTitle>
          <CardDescription>All user-submitted contact messages</CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-slate-500 text-sm">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-slate-500 text-sm">No messages found.</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => !msg.read && markAsRead(msg._id)}
                  className={`p-4 rounded-md space-y-2 border transition-all cursor-pointer ${
                    msg.read
                      ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                      : "bg-green-50 border-green-400 hover:bg-green-100"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p
                        className={`flex items-center gap-2 ${
                          msg.read
                            ? "font-medium text-slate-900 dark:text-slate-100"
                            : "font-semibold text-green-800 dark:text-green-400"
                        }`}
                      >
                        <User size={16} /> {msg.fullName}
                        {!msg.read && (
                          <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </p>

                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <Mail size={14} /> {msg.email}
                      </p>
                      {msg.company && (
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                          <Building2 size={14} /> {msg.company}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 flex items-center gap-2">
                        <Calendar size={12} />
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!msg.read) markAsRead(msg._id);
                        }}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMessage(msg._id);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-1">
                    <p className="font-semibold text-slate-700 dark:text-slate-200">
                      Subject: {msg.subject || "—"}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-line">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
