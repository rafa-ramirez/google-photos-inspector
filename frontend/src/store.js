import create from 'zustand';



export const useAnalysisStore = create((set) => ({
  analysisResults: [],
  analysisSummary: null,
  isAnalyzing: false,
  analysisError: null,
  
  setAnalysisResults: (results) => set({ analysisResults: results }),
  setAnalysisSummary: (summary) => set({ analysisSummary: summary }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisError: (error) => set({ analysisError: error }),
  clearResults: () => set({ analysisResults: [], analysisSummary: null, analysisError: null })
}));
