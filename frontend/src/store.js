import create from 'zustand';



export const useAnalysisStore = create((set) => ({
  language: 'en',
  analysisResults: [],
  analysisSummary: null,
  isAnalyzing: false,
  analysisError: null,
  
  setLanguage: (lang) => set({ language: lang }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
  setAnalysisSummary: (summary) => set({ analysisSummary: summary }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisError: (error) => set({ analysisError: error }),
  clearResults: () => set({ analysisResults: [], analysisSummary: null, analysisError: null })
}));
