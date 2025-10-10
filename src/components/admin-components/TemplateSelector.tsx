"use client";

import { emailTemplates, EmailTemplateType } from "@/libs/emailTemplates";

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: EmailTemplateType) => void;
  selectedTemplate?: EmailTemplateType;
}

const TemplateSelector = ({
  onSelectTemplate,
  selectedTemplate,
}: TemplateSelectorProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">
        Choose Your Email Template
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emailTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelectTemplate(template.id)}
            className={`relative p-6 rounded-xl border-2 transition-all text-left ${
              selectedTemplate === template.id
                ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">{template.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-bold text-white">
                    {template.name}
                  </h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  {template.description}
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: template.colors.secondary }}
                  />
                  <span className="text-xs text-gray-500 ml-1">
                    Template colors
                  </span>
                </div>
              </div>
            </div>
            {selectedTemplate === template.id && (
              <div className="absolute top-4 right-4 bg-indigo-500 text-white rounded-full p-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
