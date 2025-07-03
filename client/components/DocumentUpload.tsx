import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  File,
  FileText,
  Image,
  Download,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Folder,
  Search,
  Filter,
  Plus,
  Sparkles,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: "uploaded" | "processing" | "verified" | "rejected";
  category: string;
  description?: string;
  aiAnalysis?: {
    score: number;
    suggestions: string[];
    issues: string[];
  };
}

export default function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "passport_scan.pdf",
      type: "PDF",
      size: "2.1 MB",
      uploadDate: "2024-01-15",
      status: "verified",
      category: "Identity Documents",
      aiAnalysis: {
        score: 95,
        suggestions: ["Document quality is excellent"],
        issues: [],
      },
    },
    {
      id: "2",
      name: "diploma_certificate.jpg",
      type: "Image",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      status: "processing",
      category: "Education Documents",
    },
    {
      id: "3",
      name: "employment_letter.pdf",
      type: "PDF",
      size: "0.8 MB",
      uploadDate: "2024-01-13",
      status: "uploaded",
      category: "Employment Documents",
      aiAnalysis: {
        score: 78,
        suggestions: [
          "Consider adding salary details",
          "Include company letterhead",
        ],
        issues: ["Missing employment start date"],
      },
    },
  ]);

  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const documentCategories = [
    "Identity Documents",
    "Education Documents",
    "Employment Documents",
    "Financial Documents",
    "Medical Documents",
    "Legal Documents",
    "Other",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "uploaded":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "verified":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "processing":
        return <Upload className="w-4 h-4 text-yellow-600" />;
      default:
        return <File className="w-4 h-4 text-blue-600" />;
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, []);

  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // Add new documents
    const newDocuments = files.map((file, index) => ({
      id: Date.now().toString() + index,
      name: file.name,
      type: file.type.includes("pdf") ? "PDF" : "Image",
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "uploaded" as const,
      category: "Other",
    }));

    setDocuments((prev) => [...prev, ...newDocuments]);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const analyzeWithAI = async (documentId: string) => {
    const docIndex = documents.findIndex((doc) => doc.id === documentId);
    if (docIndex === -1) return;

    // Update status to processing
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId ? { ...doc, status: "processing" as const } : doc,
      ),
    );

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock AI analysis results
    const mockAnalysis = {
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      suggestions: [
        "Document quality is good",
        "All required information is visible",
        "Consider higher resolution for better clarity",
      ],
      issues: Math.random() > 0.5 ? [] : ["Minor quality issues detected"],
    };

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              status: "verified" as const,
              aiAnalysis: mockAnalysis,
            }
          : doc,
      ),
    );
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-vm-green bg-vm-green/5"
                : "border-vm-gray-300 hover:border-vm-green/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-vm-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-vm-gray-600 mb-4">
              Support for PDF, JPG, PNG files up to 10MB each
            </p>
            <div className="flex items-center justify-center space-x-4">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileUpload(Array.from(e.target.files || []))
                }
                className="hidden"
                id="file-upload"
              />
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                className="bg-vm-green hover:bg-vm-green-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
              <Button variant="outline">
                <Folder className="w-4 h-4 mr-2" />
                Browse Templates
              </Button>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">
                  Uploading...
                </span>
                <span className="text-sm text-blue-700">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Documents ({filteredDocuments.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vm-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {documentCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center space-x-4 p-4 border border-vm-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0">
                  {doc.type === "PDF" ? (
                    <FileText className="w-10 h-10 text-red-500" />
                  ) : (
                    <Image className="w-10 h-10 text-blue-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-vm-gray-900 truncate">
                      {doc.name}
                    </h4>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                    {doc.aiAnalysis && (
                      <Badge variant="secondary" className="text-xs">
                        AI Score: {doc.aiAnalysis.score}%
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-vm-gray-500">
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.uploadDate}</span>
                    <span>•</span>
                    <span>{doc.category}</span>
                  </div>
                  {doc.aiAnalysis && doc.aiAnalysis.issues.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-red-600">
                        Issues: {doc.aiAnalysis.issues.join(", ")}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {doc.status === "uploaded" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => analyzeWithAI(doc.id)}
                      className="text-xs"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Check
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-vm-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
                No documents found
              </h3>
              <p className="text-vm-gray-600 mb-4">
                Upload your immigration documents to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Document Analyzer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-vm-green" />
            <span>AI Document Analyzer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Document Quality Check
              </h4>
              <p className="text-sm text-blue-700">
                AI analyzes image quality, legibility, and completeness
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">
                Content Verification
              </h4>
              <p className="text-sm text-green-700">
                Validates required information and format compliance
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">
                Improvement Suggestions
              </h4>
              <p className="text-sm text-purple-700">
                Provides recommendations to strengthen your application
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
