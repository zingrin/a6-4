"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Edit2, Check, X } from "lucide-react";
import { availabilityService } from "@/services/availability.service";
import { Availability, AvailabilityCardProps, AvailabilityData, AvailabilityStatus } from "@/types";
import { toast } from "sonner";
import { deleteAvailabilityAction, updateAvailabilityAction } from "@/actions/tutor.action";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DAYS } from "@/constants";

export function AvailabilityCard({ availability }: AvailabilityCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedData, setEditedData] = useState({
    day: availability.day,
    startTime: availability.startTime,
    endTime: availability.endTime,
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Updating availability...");

    try {
      const res = await updateAvailabilityAction(editedData, availability.id);

      if (res?.error) {
        toast.error(res.error, { id: toastId });
        return;
      }

      toast.success(res.data.message || "Availability updated", {
        id: toastId,
      });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update availability", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Deleting availability...");

    try {
      const res = await deleteAvailabilityAction(availability.id);

      if (res?.error) {
        toast.error(res.error, { id: toastId });
        return;
      }

      toast.success(res.data.message || "Availability deleted", {
        id: toastId,
      });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete availability", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedData({
      day: availability.day,
      startTime: availability.startTime,
      endTime: availability.endTime,
    });
    setIsEditing(false);
  };

  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge
            variant={
              availability.status === "AVAILABLE" ? "default" : "secondary"
            }
            className="font-medium"
          >
            {availability.status}
          </Badge>

          {!isEditing ? (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                disabled={availability.status === AvailabilityStatus.BOOKED}
                className="h-8 w-8"
              >
                <Edit2 className="h-4 w-4" />
              </Button>

              <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={availability.status === AvailabilityStatus.BOOKED}
                      className="h-8 w-8 hover:bg-red-600/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Delete Availability</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this time slot? This action cannot be undone and will remove your availability.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                  <DialogClose asChild>
                      <Button variant="destructive" onClick={handleDelete}>
                        Delete
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUpdate}
                disabled={isLoading}
                className="h-8 w-8"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                disabled={isLoading}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Day field */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Label
              htmlFor={`day-${availability.id}`}
              className="text-sm font-medium"
            >
              Day
            </Label>
          </div>
          {isEditing ? (
            <Select
              value={editedData.day}
              onValueChange={(value) =>
                setEditedData((prev) => ({ ...prev, day: value }))
              }
            >
              <SelectTrigger id={`day-${availability.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="text-lg font-semibold">{availability.day}</div>
          )}
        </div>

        {/* Time fields */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Time</Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start time */}
            <div className="space-y-2">
              <Label
                htmlFor={`start-time-${availability.id}`}
                className="text-xs text-muted-foreground"
              >
                Start Time
              </Label>
              {isEditing ? (
                <Input
                  id={`start-time-${availability.id}`}
                  type="time"
                  value={editedData.startTime}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                />
              ) : (
                <div className="text-base font-medium">
                  {availability.startTime}
                </div>
              )}
            </div>

            {/* End time */}
            <div className="space-y-2">
              <Label htmlFor={`end-time-${availability.id}`} className="text-xs text-muted-foreground"
              >
                End Time
              </Label>
              {isEditing ? (
                <Input
                  id={`end-time-${availability.id}`}
                  type="time"
                  value={editedData.endTime}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                />
              ) : (
                <div className="text-base font-medium">
                  {availability.endTime}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
