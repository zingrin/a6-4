'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { createAvailabilityAction } from '@/actions/tutor.action';
import { AvailabilityData } from '@/types';
import { DAYS } from '@/constants';
import { toast } from 'sonner';


export function CreateAvailabilityDialog() {

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<AvailabilityData>>({
    day: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.day || !formData.startTime || !formData.endTime) {
      console.error('Please fill in all fields');
      return;
    }

     setIsLoading(true);
        const toastId = toast.loading("Adding availability...");
    
        try {
          const res = await createAvailabilityAction(formData,);
    
          if (res?.error) {
            toast.error(res.error, { id: toastId });
            return;
          }
    
          toast.success(res.data.message || "Availability added", {
            id: toastId,
          });
        } catch (err) {
          console.log(err);
          toast.error("Failed to add availability", { id: toastId });
        } finally {
          setIsLoading(false);
        }

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 w-full md:w-fit">
          <Plus className="h-4 w-4" />
          Add Availability
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Availability</DialogTitle>
          <DialogDescription>
            Add a new availability slot to your schedule.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Day field */}
            <div className="grid gap-2">
              <Label htmlFor="day">Day</Label>
              <Select
                value={formData.day}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, day: value }))
                }
              >
                <SelectTrigger id="day">
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Start time field */}
            <div className="grid gap-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, startTime: e.target.value }))
                }
              />
            </div>

            {/* End time field */}
            <div className="grid gap-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endTime: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
            >
              Cancel
            </Button>
            </DialogClose>

            <DialogClose asChild>

            <Button type="submit" disabled={isLoading}>
              Add
            </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}