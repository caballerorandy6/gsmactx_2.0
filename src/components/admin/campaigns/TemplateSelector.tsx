"use client";

import type { ComponentType, SVGProps } from "react";
import {
  CalendarDaysIcon,
  NewspaperIcon,
  TagIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/20/solid";
import { emailTemplates, EmailTemplateType } from "@/lib/email/emailTemplates";

const templateIcons: Record<
  EmailTemplateType,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  promotional: TagIcon,
  newsletter: NewspaperIcon,
  "service-reminder": WrenchScrewdriverIcon,
  seasonal: CalendarDaysIcon,
};

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: EmailTemplateType) => void;
  selectedTemplate?: EmailTemplateType;
}

const TemplateSelector = ({
  onSelectTemplate,
  selectedTemplate,
}: TemplateSelectorProps) => {
  return (
    <div className="mb-8 w-full">
      <h2 className="mb-1 text-lg font-semibold text-white">Template</h2>
      <p className="mb-4 text-sm text-gray-400">
        Sets the starting text and colors. You can edit everything below.
      </p>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        role="group"
        aria-label="Email templates"
      >
        {emailTemplates.map((template) => {
          const Icon = templateIcons[template.id];
          const selected = selectedTemplate === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate(template.id)}
              aria-pressed={selected}
              className={`relative rounded-lg border p-4 text-left transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 sm:p-5 ${
                selected
                  ? "border-primary-500 bg-primary-500/10 ring-1 ring-primary-500"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  aria-hidden="true"
                  className={`flex size-10 shrink-0 items-center justify-center rounded-md ${
                    selected
                      ? "bg-primary-600 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0 pr-8">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-white">
                      {template.name}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 whitespace-nowrap">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      aria-hidden="true"
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0"
                      style={{ backgroundColor: template.colors.primary }}
                    />
                    <div
                      aria-hidden="true"
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0"
                      style={{ backgroundColor: template.colors.secondary }}
                    />
                    <span className="text-xs text-gray-500 ml-1 hidden sm:inline">
                      Template colors
                    </span>
                  </div>
                </div>
              </div>
              {selected && (
                <CheckIcon
                  aria-hidden="true"
                  className="absolute top-3 right-3 size-5 text-primary-400 sm:top-4 sm:right-4"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
